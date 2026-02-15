'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { deleteTodo } from '@/lib/api/todos';
import { Todo } from '@/lib/types/todo';

interface DeleteTodoModalProps {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeleteTodoModal({ todo, isOpen, onClose, onSuccess }: DeleteTodoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    setError('');

    try {
      await deleteTodo(todo.id);

      if (onSuccess) {
        onSuccess();
      } else {
        // If no callback provided, redirect back to dashboard
        router.push('/dashboard/todos');
        router.refresh();
      }

      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to delete todo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
      confirmText={isLoading ? "Deleting..." : "Delete Todo"}
      cancelText="Cancel"
      onConfirm={handleDelete}
      showActions={true}
      size="md"
    >
      <div className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
        <p>
          Are you sure you want to delete the todo "{todo.title}"? This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}