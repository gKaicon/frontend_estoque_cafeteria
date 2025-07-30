"use client"; // Precisa ser um client component para usar hooks

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  
  if (isLoading) {
    return <p className="text-center p-10">Verificando sua sessão...</p>;
  }

  
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
}