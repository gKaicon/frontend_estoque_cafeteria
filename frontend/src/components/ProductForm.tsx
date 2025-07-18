// src/components/ProdutoForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { Product } from '@/lib/types'; // Vamos reutilizar a tipagem de Produto

interface ProductFormProps {
  productToEdit?: Product; // Opcional, para o modo de edição
}

export default function ProductForm({ productToEdit }: ProductFormProps) {
  const [name, setNome] = useState(productToEdit?.name || '');
  const [description, setDescricao] = useState(productToEdit?.description || '');
  const [sale_price, setPrecoVenda] = useState(productToEdit?.sale_price || 0);
  const [stock, setEstoque] = useState(productToEdit?.stock || 0);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const productData = {
      name,
      description,
      sale_price,
      stock,
    };

    // Validação simples
    if (!name || sale_price <= 0) {
      setError('Nome e Preço de Venda são obrigatórios.');
      return;
    }

    try {
      if (productToEdit) {
        // Modo Edição
        await api.put(`/products/${productToEdit.id}`, productData);
        alert('Produto atualizado com sucesso!');
      } else {
        // Modo Criação
        await api.post('/products', productData);
        alert('Produto cadastrado com sucesso!');
      }
      router.push('/products'); // Redireciona para uma futura página de listagem
      router.refresh();
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.message || 'Ocorreu um erro ao salvar o produto.';
      // Lida com erros de validação do Laravel
      if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors;
        const firstError = Object.values(validationErrors)[0] as string[];
        setError(firstError[0]);
      } else {
        setError(message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome do Produto
        </label>
        <input
          type="text"
          id="nome"
          value={name}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          required
        />
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="descricao"
          value={description}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preco_venda" className="block text-sm font-medium text-gray-700">
            Preço de Venda (R$)
          </label>
          <input
            type="number"
            id="preco_venda"
            value={sale_price}
            onChange={(e) => setPrecoVenda(parseFloat(e.target.value))}
            step="0.01"
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="estoque" className="block text-sm font-medium text-gray-700">
            Estoque Inicial
          </label>
          <input
            type="number"
            id="estoque"
            value={stock}
            onChange={(e) => setEstoque(parseInt(e.target.value))}
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
            required
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {productToEdit ? 'Atualizar Produto' : 'Cadastrar Produto'}
      </button>
    </form>
  );
}