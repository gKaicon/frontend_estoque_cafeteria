"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

import api from '@/services/api';
import { Sell } from '@/lib/types';

export default function SellsPage() {
  const [sells, setSells] = useState<Sell[]>([]);

  useEffect(() => {
    const getSells = async () => {
      try {
        const response = await api.get('/sells');
        setSells(response.data);
      } catch (err) {
        console.error("Falha ao buscar vendas:", err);
      }
    };
    getSells();
  }, []);

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
                    {new Date(sell.sale_date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
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