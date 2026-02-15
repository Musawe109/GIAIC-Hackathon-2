import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div className={cn(
      'flex items-center p-4 rounded-lg bg-red-50 border border-red-200 text-red-700',
      className
    )}>
      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
      <span className="text-sm">{message}</span>
    </div>
  );
}