import BuyForm from '@/components/BuyForm';
import api from '@/services/api';
import { Buy } from '@/lib/types';

async function getBuy(id: string): Promise<Buy | null> {
  try {
    const response = await api.get(`/buys/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function UpdateBuyPage({ params }: { params: { id: string } }) {
  const buy = await getBuy(params.id);

  if (!buy) {
    return <div>Compra não encontrada.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Compra #{buy.id}</h1>
      <BuyForm buyToEdit={buy} />
    </div>
  );
}