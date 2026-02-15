// Authentication utilities for managing JWT tokens and user state

// Store the JWT token in localStorage (or secure cookie in production)
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

// Retrieve the JWT token from storage
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Remove the JWT token (logout)
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) {
    return false;
  }

  // Check if token is expired (if it has expiration info)
  try {
    const payload = parseJwt(token);
    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    }
    // If no expiration, assume valid
    return true;
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return false;
  }
};

// Parse JWT to extract payload
export const parseJwt = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    throw error;
  }
};

// Get user info from token
export const getCurrentUser = (): any | null => {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  try {
    const payload = parseJwt(token);
    return {
      id: payload.userId || payload.sub,
      email: payload.email,
      name: payload.name,
      ...payload
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Login function - typically called after successful auth with backend
export const login = async (email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let errorData;
      try {
        const responseText = await response.text();
        errorData = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error('Failed to parse error response:', e);
        return { success: false, error: 'Login failed - server returned an invalid response' };
      }
      return { success: false, error: errorData.message || 'Login failed' };
    }

    let data;
    try {
      const responseText = await response.text();
      data = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error('Failed to parse response:', e);
      return { success: false, error: 'Login failed - server returned an invalid response' };
    }

    if (data.token) {
      setAuthToken(data.token);
      return { success: true, token: data.token };
    }

    return { success: false, error: 'No token received from server' };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: error.message || 'Network error during login' };
  }
};

// Logout function
export const logout = (): void => {
  removeAuthToken();
  // Optionally redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};