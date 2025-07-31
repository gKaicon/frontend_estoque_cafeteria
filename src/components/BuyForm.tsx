'use client';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { Product, ItemBuy, Buy } from '@/lib/types';
import { Metadata } from 'next/types';

interface BuyFormProps {
  buyToEdit?: Buy; 
}

export const metadata: Metadata = {
  title: "Carrinho - Compras"
}

export default function BuyForm({ buyToEdit }: BuyFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [itens, setItens] = useState<ItemBuy[]>(buyToEdit?.itens || []);

  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [amount, setQuantidade] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    api.get('/products').then(response => setProducts(response.data));
  }, []);

  const handleAddItem = () => {
    const produto = products.find(p => p.id === parseInt(selectedProductId));
    if (!produto || amount <= 0) {
      toast.info('Selecione um produto e uma quantidade válida.');
      return;
    }

    const itemExists = itens.find(item => item.product_id === produto.id);
    if (itemExists) {
      toast.error('Este produto já foi adicionado.');
      return;
    }

    setItens([...itens, {
      product_id: produto.id,
      amount: amount,
      product: produto
    }]);

    setSelectedProductId('');
    setQuantidade(1);
  };

  const handleRemoveItem = (productId: number) => {
    setItens(itens.filter(item => item.product_id !== productId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itens.length === 0) {
      toast.info('Adicione pelo menos um item à compra.');
      return;
    }

    const buyData = {
      itens: itens.map(({ product_id, amount }) => ({ product_id, amount })),
    };

    try {
      if (buyToEdit) {
        await api.put(`/buys/${buyToEdit.id}`, buyData);
        toast.success('Compra atualizada com sucesso!', {
          onClose: () => {
            router.push('/buys');
            router.refresh();
          },
        });
      } else {
        await api.post('/buys', buyData);
        toast.success('Compra criada com sucesso!', {
          onClose: () => {
            router.push('/buys');
            router.refresh();
          },
        });
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Ocorreu um erro.';
      toast.error(`Erro: ${errorMessage}`);
    }
  };

  const total = itens.reduce((acc, item) => {
    const preco = item.product?.sale_price || 0;
    return acc + (preco * item.amount);
  }, 0);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-b-lg text-gray-700">
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

        <div>
          <h2 className="text-xl font-semibold mb-2">Itens da Compra</h2>
          <table className="min-w-full bg-white border rounded-2xl">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-start">Produto</th>
                <th className="py-2 px-4 border-b text-start">Qtd</th>
                <th className="py-2 px-4 border-b text-start">Preço Unit.</th>
                <th className="py-2 px-4 border-b text-start">Subtotal</th>
                <th className="py-2 px-4 border-b text-start">Ação</th>
              </tr>
            </thead>
            <tbody>
              {itens.map(item => (
                <tr key={item.product_id}>
                  <td className="py-2 px-4 border-b text-start">{item.product?.name}</td>
                  <td className="py-2 px-4 border-b text-start">{item.amount}</td>
                  <td className="py-2 px-4 border-b text-start">R$ {Number(item.product?.sale_price).toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-start">R$ {(Number(item.product?.sale_price) * item.amount).toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-start">
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
          {buyToEdit ? 'Atualizar Compra' : 'Finalizar Compra'}
        </button>
      </form>
    </>
  );
}