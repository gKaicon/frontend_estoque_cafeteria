'use client';

import Link from 'next/link';

import { useAuth } from '@/context/AuthContext';

export default function Navbar() {

  const { isAuthenticated, user, logout } = useAuth();


  return (
    <nav className="bg-black text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
          Cafeteria Control
        </Link>
        <div className="space-x-6">
          {isAuthenticated ? (
            <>
              <Link href="/products/" className="text-lg hover:text-gray-300 transition-colors">
                Produtos
              </Link>
              <Link href="/sells/" className="text-lg hover:text-gray-300 transition-colors">
                Vendas
              </Link>
              <Link href="/buys/" className="text-lg hover:text-gray-300 transition-colors">
                Compras
              </Link>
              <Link href="/" className="text-lg hover:text-gray-300 transition-colors mr-2">
                Olá, {user?.name}!
              </Link>
              <Link href="#">
                <button onClick={logout}>Sair</button>
              </Link>
            </>
          ) : (
            <Link href="/login/" className="text-lg hover:text-gray-300 transition-colors">
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}