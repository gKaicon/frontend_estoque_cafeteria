import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
          Cafeteria Control
        </Link>
        <div className="space-x-6">
          <Link href="/products" className="text-lg hover:text-gray-300 transition-colors">
            Produtos
          </Link>
          <Link href="/sells" className="text-lg hover:text-gray-300 transition-colors">
            Vendas
          </Link>
          <Link href="/buys" className="text-lg hover:text-gray-300 transition-colors">
            Compras
          </Link>
        </div>
      </div>
    </nav>
  );
}