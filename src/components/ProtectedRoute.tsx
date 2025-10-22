'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../lib/auth';

export default function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.log('No token found, redirecting to login');
      router.push('/auth/login');
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!allowedRoles.includes(payload.role)) {
        console.log(`Role ${payload.role} not allowed, redirecting to login`);
        router.push('/auth/login');
      }
    } catch (e) {
      console.error('Error decoding token:', e);
      router.push('/auth/login');
    }
  }, [router, allowedRoles]);

  return getToken() ? <>{children}</> : null;
}