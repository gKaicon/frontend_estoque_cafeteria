// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        Bem-vindo ao Sistema de Gestão
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Gerencie seus produtos e vendas de forma simples e eficiente.
      </p>

      <div className="flex justify-center gap-8">
        {/* Card para Produtos */}
        <Link href="/products" className="group block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 transition-all">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Gerenciar Produtos
          </h5>
          <p className="font-normal text-gray-700">
            Adicione, visualize, edite e remova produtos do seu inventário.
          </p>
        </Link>

        {/* Card para Vendas */}
        <Link href="/sells/nova" className="group block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 transition-all">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Realizar Nova Venda
          </h5>
          <p className="font-normal text-gray-700">
            Crie um novo registro de venda e atualize seu estoque automaticamente.
          </p>
        </Link>
      </div>
    </div>
  );
}