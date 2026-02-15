// Centralized API client for all REST calls
import { toast } from 'react-hot-toast'; // We'll install this later

// Define the base configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

interface ApiOptions {
  headers?: Record<string, string>;
  retries?: number;
}

/**
 * Generic API client for making HTTP requests with JWT authentication
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || BASE_URL;
  }

  /**
   * Makes an API request with JWT token inclusion and error handling
   */
  async request<T>(
    endpoint: string,
    options: RequestInit & ApiOptions = {}
  ): Promise<T> {
    const { headers = {}, retries = 3, ...requestOptions } = options;

    // Get JWT token from wherever it's stored (localStorage, cookie, etc.)
    const token = this.getAuthToken();

    // Construct the full URL
    const url = `${this.baseUrl}${endpoint}`;

    // Prepare headers
    const requestHeaders = new Headers(headers);
    requestHeaders.set('Content-Type', 'application/json');

    // Add authorization header if token exists
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }

    let attempt = 0;
    let lastError: any;

    while (attempt < retries) {
      try {
        const response = await fetch(url, {
          ...requestOptions,
          headers: requestHeaders,
        });

        // Handle different response status codes
        if (!response.ok) {
          // Handle specific error statuses
          if (response.status === 401) {
            // Unauthorized - possibly expired token
            this.handleUnauthorized();
            throw new Error('Authentication required');
          } else if (response.status === 403) {
            // Forbidden
            throw new Error('Access denied');
          } else if (response.status >= 500) {
            // Server error - good candidate for retry
            if (attempt < retries - 1) {
              await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
              attempt++;
              continue;
            }
          }

          // Parse error response
          let errorMessage = `HTTP Error: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.detail || errorMessage;
          } catch (e) {
            // If response is not JSON, use status text
            errorMessage = response.statusText || errorMessage;
          }

          throw new Error(errorMessage);
        }

        // Success case - parse and return JSON
        // Check if response has content before trying to parse
        const contentLength = response.headers.get('content-length');
        const contentType = response.headers.get('content-type');
        
        if (response.status === 204 || 
            response.status === 205 || 
            contentLength === '0' || 
            !contentType?.includes('application/json')) {
          // Response has no content or is not JSON
          return {} as T; // Return empty object for no-content responses
        }

        // For responses that should have content
        const responseBody = await response.text();

        if (!responseBody) {
          console.warn('Received empty response body for endpoint:', url);
          return {} as T; // Return empty object for empty responses
        }

        try {
          return JSON.parse(responseBody);
        } catch (parseError) {
          console.error('Failed to parse JSON response for endpoint:', url, 'Response:', responseBody);
          throw new Error('Invalid JSON response from server');
        }
      } catch (error: any) {
        lastError = error;

        if (attempt === retries - 1) {
          // Final attempt - throw the error
          console.error(`API request failed after ${retries} attempts:`, error);

          // Show user-friendly error message
          const errorMessage = error.message || 'An error occurred while processing your request';
          toast.error(errorMessage);

          throw error;
        }

        // Retry after delay
        await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
        attempt++;
      }
    }

    throw lastError;
  }

  /**
   * Helper method to get JWT token from storage
   */
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      // Try to get from localStorage
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  /**
   * Helper method to handle unauthorized responses
   */
  private handleUnauthorized(): void {
    // Remove stored token
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }

    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  /**
   * Delay helper for retry mechanism
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Convenience methods for common HTTP verbs
  get<T>(endpoint: string, options?: ApiOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, data?: any, options?: ApiOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(endpoint: string, data?: any, options?: ApiOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  patch<T>(endpoint: string, data?: any, options?: ApiOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string, options?: ApiOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();

// Export the class for potential extension
export default ApiClient;