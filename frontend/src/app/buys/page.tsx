import Link from 'next/link';
import api from '@/services/api';
import { Buy } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compras Realizadas',
};

async function getBuys(): Promise<Buy[]> {
  try {
    const response = await api.get('/buys');
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar compras:", error);
    return [];
  }
}

export default async function BuysPage() {
  const buys = await getBuys();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center rounded-t-xl bg-white px-4 py-2">
        <h1 className="text-black text-2xl font-bold">Compras Realizadas</h1>
        <Link href="/buys/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          Nova Compra
        </Link>
      </div>
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full table-auto rounded-b-xl">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Data da Compra</th>
              <th className="py-3 px-6 text-left">Lista Itens</th>
              <th className="py-3 px-6 text-center">Quantidade de Itens</th>
              <th className="py-3 px-6 text-right">Valor Total</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {buys.map(buy => (
              <tr key={buy.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{buy.id}</td>
                <td className="py-3 px-6 text-left">{new Date(buy.purchase_date).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-left">
                  {buy.itens.map((item, idx) => (
                    <span key={idx}>{item.product?.name}{idx < buy.itens.length - 1 ? ', ' : ''}</span>
                  ))}
                </td>
                <td className="py-3 px-6 text-center">{buy.itens.length}</td>
                <td className="py-3 px-6 text-right">R$ {Number(buy.total_value).toFixed(2)}</td>
                <td className="py-3 px-6 text-center">
                  <Link href={`/buys/${buy.id}`} className="text-blue-500 hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='rounded-b-xl border-0 bg-white min-h-8'></div>
      </div>
    </div>
  );
}