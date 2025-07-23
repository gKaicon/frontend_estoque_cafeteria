"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import api from '@/services/api';
import { Product } from '@/lib/types';
import { useAuth } from '@/context/AuthContext'; 

import ProductActions from '@/components/ProductActions'; 

export default function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();


  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, router]);


  useEffect(() => {

    if (isAuthenticated) {
      const getProducts = async () => {
        try {
          const response = await api.get('/products');
          setProducts(response.data);
        } catch (err) {
          console.error("Falha ao buscar produtos:", err);
          setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
        } finally {
          setIsLoading(false);
        }
      };
      
      getProducts();
    }
  }, [isAuthenticated]); 


  if (isAuthLoading || isLoading) {
    return <p className="text-center p-10">Carregando...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }
  
  if (error) {
     return <p className="text-center text-red-500 p-10">{error}</p>;
  }

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
                  <td className="py-3 px-6 text-center">
                     <ProductActions productId={product.id} />
                  </td>
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