// src/app/produtos/[id]/editar/page.tsx
import ProductForm from "@/components/ProductForm";
import api from "@/services/api";
import { Product } from "@/lib/types";

// Função para buscar os dados do produto específico
async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar produto:", error);
    return null;
  }
}

export default async function UpdateProductPage({ params }: { params: { id: string } }) {
  const produto = await getProduct(params.id);

  if (!produto) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center">Produto não encontrado</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Editar Produto: {produto.name}
      </h1>
      {/* Reutilizando o formulário no modo de edição */}
      <ProductForm productToEdit={produto} />
    </div>
  );
}