'use client';

import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react'; 
import { useRouter } from 'next/navigation';
import api from '@/services/api';


interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('authToken');
    router.push('/login');
  }, [router]);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await api.get('/me');
          setUser(response.data);
        } catch (error) {
          console.error("Token inválido, fazendo logout.");
          logout();
        }
      }
      setIsLoading(false);
    };
    checkUser();
  }, [logout]);

  const login = async (token: string) => {
    localStorage.setItem('authToken', token);
    try {
      const response = await api.get('/me');
      setUser(response.data);
      router.push('/');
    } catch (error) {
      console.error("Falha ao buscar dados do usuário após o login", error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};