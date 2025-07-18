// src/components/ProdutoActions.tsx
'use client'; // Essencial para indicar que é um Client Component

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

interface ProductActionsProps {
  productId: number;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    // Pede confirmação antes de excluir
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.delete(`/products/${productId}`);
        alert('Produto excluído com sucesso!');
        // Força a atualização da lista de produtos na página
        router.refresh();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Falha ao excluir o produto.');
      }
    }
  };

  return (
    <td className="py-3 px-6 text-center">
      <div className="flex item-center justify-center space-x-4">
        <Link href={`/products/${productId}/update`} className="text-yellow-600 hover:text-yellow-900">
          Editar
        </Link>
        <button onClick={handleDelete} className="text-red-600 hover:text-red-900">
          Excluir
        </button>
      </div>
    </td>
  );
}