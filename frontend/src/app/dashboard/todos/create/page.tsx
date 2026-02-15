'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAuthenticated } from '@/lib/auth';
import CreateTodoForm from '@/components/todos/create-todo-form';

export default function CreateTodoPage() {
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthenticated()) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Todo</h1>
      </div>
      <CreateTodoForm
        onSuccess={() => {
          // After creating a todo, redirect back to the dashboard with refresh param
          router.push('/dashboard/todos?refresh=' + Date.now() as any);
          router.refresh();
        }}
      />
    </div>
  );
}