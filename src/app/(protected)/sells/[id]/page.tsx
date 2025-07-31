import SellForm from '@/components/SellForm';
import api from '@/services/api';
import { Sell } from '@/lib/types';

async function getSell(id: string): Promise<Sell | null> {
  try {
    const response = await api.get(`/sells/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function UpdateSellPage({ params }: { params: { id: string } }) {
  const sell = await getSell(params.id);

  if (!sell) {
    return <div>Venda não encontrada.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Venda #{sell.id}</h1>
      <SellForm sellToEdit={sell} />
    </div>
  );
}