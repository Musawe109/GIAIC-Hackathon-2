// API client specifically for todo operations
import { apiClient } from './client';
import { Todo } from '@/lib/types/todo';

// Helper function to convert snake_case keys to camelCase
function snakeToCamel(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  }

  const camelObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Convert snake_case to camelCase
      const camelKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
      camelObj[camelKey] = snakeToCamel(obj[key]);
    }
  }
  return camelObj;
}

/**
 * Get all todos for the authenticated user
 */
export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await apiClient.get<any[]>('/api/todos');
  return response.map(snakeToCamel);
};

/**
 * Get a specific todo by ID
 */
export const getTodoById = async (id: string): Promise<Todo> => {
  const response = await apiClient.get<any>(`/api/todos/${id}`);
  return snakeToCamel(response);
};

/**
 * Create a new todo
 */
export const createTodo = async (todoData: Partial<Todo>): Promise<Todo> => {
  // Convert camelCase to snake_case for the request
  const snakeData = {
    ...(todoData.title !== undefined && { title: todoData.title }),
    ...(todoData.description !== undefined && { description: todoData.description }),
    ...(todoData.completed !== undefined && { completed: todoData.completed }),
  };
  
  const response = await apiClient.post<any>('/api/todos', snakeData);
  return snakeToCamel(response);
};

/**
 * Update an existing todo
 */
export const updateTodo = async (id: string, todoData: Partial<Todo>): Promise<Todo> => {
  // Convert camelCase to snake_case for the request
  const snakeData = {
    ...(todoData.title !== undefined && { title: todoData.title }),
    ...(todoData.description !== undefined && { description: todoData.description }),
    ...(todoData.completed !== undefined && { completed: todoData.completed }),
  };
  
  const response = await apiClient.put<any>(`/api/todos/${id}`, snakeData);
  return snakeToCamel(response);
};

/**
 * Delete a todo
 */
export const deleteTodo = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/api/todos/${id}`);
};

/**
 * Toggle a todo's completion status
 */
export const toggleTodoCompletion = async (id: string): Promise<Todo> => {
  const response = await apiClient.patch<any>(`/api/todos/${id}/toggle`);
  return snakeToCamel(response);
};