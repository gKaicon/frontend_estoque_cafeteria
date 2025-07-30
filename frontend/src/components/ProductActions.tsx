'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

interface ProductActionsProps {
  productId: number;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.delete(`/products/${productId}`);
        alert('Produto excluído com sucesso!');
        router.refresh();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Falha ao excluir o produto.');
      }
    }
  };

  return (
    <div className="flex item-center justify-center space-x-4">
      <Link href={`/products/${productId}/update`} className="text-yellow-600 border border-yellow-600 hover:bg-yellow-900 hover:text-white p-2 rounded">
        Editar
      </Link>
      <button onClick={handleDelete} className="text-red-600 border border-red-600 hover:border-red-900 hover:bg-red-900 hover:text-white p-2 rounded">
        Excluir
      </button>
    </div>
  );
}