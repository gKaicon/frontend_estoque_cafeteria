// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logotipo ou Nome do Sistema */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
          Cafeteria Control
        </Link>

        {/* Links de Navegação */}
        <div className="space-x-6">
          <Link href="/products" className="text-lg hover:text-gray-300 transition-colors">
            Produtos
          </Link>
          <Link href="/sells" className="text-lg hover:text-gray-300 transition-colors">
            Vendas
          </Link>
        </div>
      </div>
    </nav>
  );
}