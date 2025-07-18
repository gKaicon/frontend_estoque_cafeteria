// components/SellForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { Product, ItemSell, Sell } from '@/lib/types';

interface SellFormProps {
  sellToEdit?: Sell; // Opcional, para edição
}

export default function SellForm({ sellToEdit }: SellFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [itens, setItens] = useState<ItemSell[]>(sellToEdit?.itens || []);
  
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [amount, setQuantidade] = useState<number>(1);
  
  const router = useRouter();

  // Carregar produtos da API
  useEffect(() => {
    api.get('/products').then(response => setProducts(response.data));
  }, []);

  const handleAddItem = () => {
    const produto = products.find(p => p.id === parseInt(selectedProductId));
    if (!produto || amount <= 0) {
      alert('Selecione um produto e uma quantidade válida.');
      return;
    }

    // Verifica se o item já está na lista
    const itemExists = itens.find(item => item.product_id === produto.id);
    if (itemExists) {
      alert('Este produto já foi adicionado.');
      return;
    }

    setItens([...itens, {
      product_id: produto.id,
      amount: amount,
      product: produto // Adiciona o objeto produto para exibição
    }]);
    
    // Resetar campos
    setSelectedProductId('');
    setQuantidade(1);
  };

  const handleRemoveItem = (productId: number) => {
    setItens(itens.filter(item => item.product_id !== productId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itens.length === 0) {
      alert('Adicione pelo menos um item à venda.');
      return;
    }

    const sellData = {
      itens: itens.map(({ product_id, amount }) => ({ product_id, amount })),
    };

    try {
      if (sellToEdit) {
        // Modo de Edição
        await api.put(`/sells/${sellToEdit.id}`, sellData);
        alert('Venda atualizada com sucesso!');
      } else {
        // Modo de Criação
        await api.post('/sells', sellData);
        alert('Venda criada com sucesso!');
      }
      router.push('/sells'); // Redireciona para a lista de vendas
      router.refresh(); // Força a atualização dos dados na página de lista
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Ocorreu um erro.';
      alert(`Erro: ${errorMessage}`);
    }
  };

  const total = itens.reduce((acc, item) => {
    const preco = item.product?.sale_price || 0;
    return acc + (preco * item.amount);
  }, 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Seção para adicionar itens */}
      <div className="p-4 border rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Adicionar Produto</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Selecione um produto</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} (Estoque: {p.stock})
              </option>
            ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
            min="1"
            className="p-2 border rounded"
          />
          <button type="button" onClick={handleAddItem} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Adicionar Item
          </button>
        </div>
      </div>

      {/* Tabela de itens adicionados */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Itens da Venda</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Produto</th>
              <th className="py-2 px-4 border-b">Qtd</th>
              <th className="py-2 px-4 border-b">Preço Unit.</th>
              <th className="py-2 px-4 border-b">Subtotal</th>
              <th className="py-2 px-4 border-b">Ação</th>
            </tr>
          </thead>
          <tbody>
            {itens.map(item => (
              <tr key={item.product_id}>
                <td className="py-2 px-4 border-b">{item.product?.name}</td>
                <td className="py-2 px-4 border-b">{item.amount}</td>
                <td className="py-2 px-4 border-b">R$ {Number(item.product?.sale_price).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">R$ {(Number(item.product?.sale_price) * item.amount).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.product_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right text-2xl font-bold">
        Total: R$ {total.toFixed(2)}
      </div>

      <button type="submit" className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 font-bold">
        {sellToEdit ? 'Atualizar Venda' : 'Finalizar Venda'}
      </button>
    </form>
  );
}