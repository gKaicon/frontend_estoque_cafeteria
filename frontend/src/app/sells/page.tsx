"use client"; // 1. Transforma o componente para rodar no cliente

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import api from '@/services/api'; // O serviço de API para o cliente
import { Sell } from '@/lib/types'; // O tipo da venda
import { useAuth } from '@/context/AuthContext'; // Hook para autenticação

// Metadados devem ser movidos para um layout.tsx ou página de servidor pai.
// export const metadata: Metadata = { ... };

export default function SellsPage() {
  // --- 2. Estados para dados, carregamento e erros ---
  const [sells, setSells] = useState<Sell[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  // Pega o status da autenticação do nosso contexto global
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // --- 3. Efeito para proteger a rota ---
  useEffect(() => {
    // Se a verificação de autenticação terminou e o usuário NÃO está logado...
    if (!isAuthLoading && !isAuthenticated) {
      router.push('/login'); // ...o mandamos para a tela de login.
    }
  }, [isAuthenticated, isAuthLoading, router]);

  // --- 4. Efeito para buscar os dados da API ---
  useEffect(() => {
    // A busca só é acionada se o usuário estiver autenticado
    if (isAuthenticated) {
      const getSells = async () => {
        setIsLoading(true);
        try {
          const response = await api.get('/sells');
          setSells(response.data);
        } catch (err) {
          console.error("Falha ao buscar vendas:", err);
          setError("Não foi possível carregar as vendas.");
        } finally {
          setIsLoading(false);
        }
      };
      
      getSells();
    }
  }, [isAuthenticated]); // Roda o efeito quando o usuário for autenticado

  // --- 5. Renderização condicional baseada nos estados ---
  // Enquanto a autenticação ou os dados carregam, exibe uma mensagem
  if (isAuthLoading || (isAuthenticated && isLoading)) {
    return <p className="text-center p-10">Carregando informações de vendas...</p>;
  }

  // O useEffect acima já redireciona, mas isso evita a renderização do resto do componente
  if (!isAuthenticated) {
    return null;
  }
  
  // Exibe uma mensagem de erro se a busca falhar
  if (error) {
     return <p className="text-center text-red-500 p-10">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center rounded-t-xl bg-white px-4 py-2">
        <h1 className="text-black text-2xl font-bold">Vendas Realizadas</h1>
        <Link href="/sells/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          Nova Venda
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-b-xl overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Data da Venda</th>
              <th className="py-3 px-6 text-left">Lista Itens</th>
              <th className="py-3 px-6 text-center">Qtde. Itens</th>
              <th className="py-3 px-6 text-right">Valor Total</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sells.length > 0 ? (
              sells.map(sell => (
                <tr key={sell.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{sell.id}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(sell.sale_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {sell.itens.map((item, idx) => (
                      <span key={idx} className="font-medium">{item.product?.name}{idx < sell.itens.length - 1 ? ', ' : ''}</span>
                    ))}
                  </td>
                  <td className="py-3 px-6 text-center">{sell.itens.length}</td>
                  <td className="py-3 px-6 text-right">R$ {Number(sell.total_value).toFixed(2)}</td>
                  <td className="py-3 px-6 text-center">
                    <button className="text-blue-500 hover:underline">
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Nenhuma venda registrada ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}