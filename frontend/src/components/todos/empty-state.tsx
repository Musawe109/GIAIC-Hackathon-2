import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  onCreateClick?: () => void;
}

export default function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="py-12 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <PlusCircle className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No todos yet</h3>
        <p className="text-gray-500 mb-6">Get started by creating your first todo</p>
        <Button
          onClick={onCreateClick}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Todo
        </Button>
      </CardContent>
    </Card>
  );
}