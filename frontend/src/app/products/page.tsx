import Link from 'next/link';
import api from '@/services/api';
import { Product } from '@/lib/types';
import ProductActions from '@/components/ProductActions'; 
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Produtos',
};

async function getProducts(): Promise<Product[]> {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar produtos:", error);
    return []; 
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gerenciamento de Produtos</h1>
          <Link href="/products/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Novo Produto
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nome</th>
                <th className="py-3 px-6 text-right">Preço de Venda</th>
                <th className="py-3 px-6 text-center">Estoque</th>
                <th className="py-3 px-6 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{product.id}</td>
                  <td className="py-3 px-6 text-left font-medium">{product.name}</td>
                  <td className="py-3 px-6 text-right">R$ {Number(product.sale_price).toFixed(2)}</td>
                  <td className="py-3 px-6 text-center">{product.stock}</td>
                  <ProductActions productId={product.id} />
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="text-center text-gray-500 py-6">Nenhum produto cadastrado.</p>
          )}
        </div>
      </div>
    </>
  );
}