'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { updateTodo } from '@/lib/api/todos';
import { Todo } from '@/lib/types/todo';

interface EditTodoFormProps {
  todo: Todo;
  onSuccess?: (updatedTodo: Todo) => void;
  onCancel?: () => void;
}

export default function EditTodoForm({ todo, onSuccess, onCancel }: EditTodoFormProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description || '');
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      setIsLoading(false);
      return;
    }

    try {
      const updatedTodo = await updateTodo(todo.id, {
        title: title.trim(),
        description: description.trim(),
        completed: todo.completed,
      });

      if (onSuccess) {
        onSuccess(updatedTodo);
      } else {
        // If no callback provided, redirect back to dashboard
        router.push('/dashboard/todos');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Todo</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          <div>
            <Input
              label="Title *"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
            />
          </div>
          <div>
            <Input
              label="Description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              as="textarea"
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {onCancel ? (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          )}
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Todo'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}