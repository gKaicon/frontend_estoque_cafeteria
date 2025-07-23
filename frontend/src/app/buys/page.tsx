"use client"; // 1. DIRETIVA PARA TRANSFORMAR EM CLIENTE

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import api from '@/services/api';
import { Buy } from '@/lib/types';
import { useAuth } from '@/context/AuthContext'; // Hook para autenticação

// Metadados devem ser movidos para um layout ou página de servidor pai.

export default function BuysPage() {
  // 2. ESTADOS PARA GERENCIAR DADOS, CARREGAMENTO E ERROS
  const [buys, setBuys] = useState<Buy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  // Pega o status de autenticação do nosso contexto global
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // 3. EFEITO PARA PROTEGER A ROTA
  useEffect(() => {
    // Se a verificação de autenticação terminou e o usuário NÃO está logado...
    if (!isAuthLoading && !isAuthenticated) {
      router.push('/login'); // ...redireciona para o login.
    }
  }, [isAuthenticated, isAuthLoading, router]);

  // 4. EFEITO PARA BUSCAR OS DADOS
  useEffect(() => {
    // A busca de dados só acontece se o usuário estiver autenticado
    if (isAuthenticated) {
      const getBuys = async () => {
        setIsLoading(true);
        try {
          const response = await api.get('/buys');
          setBuys(response.data);
        } catch (err) {
          console.error("Falha ao buscar compras:", err);
          setError("Não foi possível carregar o histórico de compras.");
        } finally {
          setIsLoading(false);
        }
      };
      
      getBuys();
    }
  }, [isAuthenticated]); // Roda o efeito se o status de autenticação mudar

  // 5. RENDERIZAÇÃO CONDICIONAL BASEADA NOS ESTADOS
  // Mostra um feedback de carregamento enquanto a autenticação ou os dados são validados
  if (isAuthLoading || (isAuthenticated && isLoading)) {
    return <div className="text-center p-10">Carregando informações...</div>;
  }

  // O useEffect acima já redireciona, mas isso evita renderizar a página vazia
  if (!isAuthenticated) {
    return null; 
  }

  // Renderiza a página principal com os dados
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center rounded-t-xl bg-white px-4 py-2">
        <h1 className="text-black text-2xl font-bold">Compras Realizadas</h1>
        <Link href="/buys/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          Nova Compra
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-b-xl overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr >
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Data da Compra</th>
              <th className="py-3 px-6 text-left">Lista Itens</th>
              <th className="py-3 px-6 text-center">Quantidade de Itens</th>
              <th className="py-3 px-6 text-right">Valor Total</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {buys.length > 0 ? (
              buys.map(buy => (
                <tr key={buy.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{buy.id}</td>
                  <td className="py-3 px-6 text-left">{new Date(buy.purchase_date).toLocaleDateString('pt-BR')}</td>
                  <td className="py-3 px-6 text-left">
                    {buy.itens.map((item, idx) => (
                      <span key={idx}>{item.product?.name}{idx < buy.itens.length - 1 ? ', ' : ''}</span>
                    ))}
                  </td>
                  <td className="py-3 px-6 text-center">{buy.itens.length}</td>
                  <td className="py-3 px-6 text-right">R$ {Number(buy.total_value).toFixed(2).replace('.', ',')}</td>
                  <td className="py-3 px-6 text-center">
                    <Link href={`/buys/${buy.id}`} className="text-blue-500 hover:underline">
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  {error ? error : "Nenhuma compra registrada."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}