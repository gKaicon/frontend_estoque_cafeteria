// app/sells/page.tsx
import Link from 'next/link';
import api from '@/services/api';
import { Sell } from '@/lib/types';

async function getSells(): Promise<Sell[]> {
  try {
    const response = await api.get('/sells');
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar vendas:", error);
    return [];
  }
}

export default async function SellsPage() {
  const sells = await getSells();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vendas Realizadas</h1>
        <Link href="/sells/nova" className="bg-blue-500 text-white px-4 py-2 rounded">
          Nova Venda
        </Link>
      </div>
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Data</th>
              <th className="py-3 px-6 text-center">Itens</th>
              <th className="py-3 px-6 text-right">Valor Total</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sells.map(sell => (
              <tr key={sell.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{sell.id}</td>
                <td className="py-3 px-6 text-left">{new Date(sell.sale_date).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">{sell.itens.length}</td>
                <td className="py-3 px-6 text-right">R$ {Number(sell.total_value).toFixed(2)}</td>
                <td className="py-3 px-6 text-center">
                  <Link href={`/sells/${sell.id}`} className="text-blue-500 hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}