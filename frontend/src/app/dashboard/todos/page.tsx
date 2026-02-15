'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Todo } from '@/lib/types/todo';
import LoadingSpinner from '@/components/ui/loading-spinner';
import ErrorMessage from '@/components/ui/error-message';
import EmptyState from '@/components/todos/empty-state';
import TodoItem from '@/components/todos/todo-item';
import { getAllTodos } from '@/lib/api/todos';
import { motion } from 'framer-motion';

export default function TodoDashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  // Fetch todos when component mounts or when coming back from create
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getAllTodos();
        setTodos(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchTodos();
    }
  }, [isAuthenticated, searchParams.get('refresh')]); // Refresh when refresh param changes

  if (!isAuthenticated()) {
    return null; // Render nothing while redirecting
  }

  const handleTodoUpdate = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  };

  const handleTodoDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 xs:gap-6">
          <div className="flex-1">
            <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Task Management
            </h1>
            <p className="text-muted-foreground mt-2">
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'} • {todos.filter(t => t.completed).length} completed
            </p>
          </div>
          <div className="w-full xs:w-auto">
            <Button
              variant="primary"
              onClick={() => router.push('/dashboard/todos/create')}
              className="w-full xs:w-auto focus-outline px-6 py-5 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New Task
            </Button>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <ErrorMessage message={error} className="mb-4" />
        </motion.div>
      )}

      {loading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-16"
        >
          <LoadingSpinner size="lg" />
        </motion.div>
      ) : todos.length === 0 ? (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <EmptyState
            onCreateClick={() => router.push('/dashboard/todos/create')}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 gap-4 xs:gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {todos.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <TodoItem
                todo={todo}
                onUpdate={handleTodoUpdate}
                onDelete={handleTodoDelete}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}