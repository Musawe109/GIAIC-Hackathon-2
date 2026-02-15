'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createTodo } from '@/lib/api/todos';
import { Todo } from '@/lib/types/todo';

interface CreateTodoFormProps {
  onSuccess?: (todo: Todo) => void;
  onCancel?: () => void;
}

export default function CreateTodoForm({ onSuccess, onCancel }: CreateTodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

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
      const newTodo = await createTodo({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });

      if (onSuccess) {
        onSuccess(newTodo);
      } else {
        // If no callback provided, redirect back to dashboard
        router.push('/dashboard/todos');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create todo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Todo</CardTitle>
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
            {isLoading ? 'Creating...' : 'Create Todo'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}