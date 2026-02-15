'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ className, type, label, error, helperText, as = 'input', rows = 3, ...props }, ref) => {
  const hasError = !!error;

  const inputElement = as === 'textarea' ? (
    <textarea
      rows={rows}
      className={cn(
        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        hasError ? 'border-red-500 focus-visible:ring-red-500' : '',
        className
      )}
      ref={ref as React.Ref<HTMLTextAreaElement>}
      {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
    />
  ) : (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        hasError ? 'border-red-500 focus-visible:ring-red-500' : '',
        className
      )}
      ref={ref as React.Ref<HTMLInputElement>}
      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  );

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      {inputElement}
      {helperText && !hasError && (
        <p className="text-xs text-neutral-500">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };