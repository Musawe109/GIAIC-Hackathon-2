'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { removeAuthToken } from '@/lib/auth';

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
}

export default function LogoutButton({
  variant = 'outline',
  size = 'md',
  className
}: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the auth token
    removeAuthToken();

    // Redirect to login page
    router.push('/login');
    router.refresh(); // Refresh to update auth context
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}