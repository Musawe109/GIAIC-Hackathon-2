'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Todo } from '@/lib/types/todo';
import { toggleTodoCompletion } from '@/lib/api/todos';
import DeleteTodoModal from '@/components/todos/delete-todo-modal';
import EditTodoForm from '@/components/todos/edit-todo-form';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleToggleCompletion = async () => {
    try {
      const updatedTodo = await toggleTodoCompletion(todo.id);
      onUpdate(updatedTodo);
    } catch (err: any) {
      console.error('Failed to toggle completion:', err);
      alert(err.message || 'Failed to update todo');
    }
  };

  const handleEditSuccess = (updatedTodo: Todo) => {
    onUpdate(updatedTodo);
    setIsEditing(false);
  };

  const handleDeleteSuccess = () => {
    onDelete(todo.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {isEditing ? (
        <EditTodoForm
          todo={todo}
          onSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <Card className="overflow-hidden group">
          <CardHeader className="pb-3">
            <CardTitle className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <Button
                  variant={todo.completed ? 'secondary' : 'outline'}
                  size="icon"
                  className={`shrink-0 mt-0.5 ${todo.completed ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                  onClick={handleToggleCompletion}
                  aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {todo.completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <div className="w-4 h-4"></div>
                  )}
                </Button>
                <span className={`truncate ${todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {todo.title}
                </span>
              </div>
              <Badge
                variant={todo.completed ? 'success' : 'warning'}
                className="self-start mt-1 xs:mt-0"
              >
                {todo.completed ? 'Completed' : 'Pending'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {todo.description && (
              <p className={`mb-4 text-sm ${todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {todo.description}
              </p>
            )}
            <div className="flex flex-col-reverse xs:flex-row justify-between items-start xs:items-center pt-2 border-t border-muted gap-2 xs:gap-0">
              <div className="text-xs text-muted-foreground mt-2 xs:mt-0">
                {new Date(todo.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity self-end xs:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteTodoModal
        todo={todo}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={handleDeleteSuccess}
      />
    </motion.div>
  );
}