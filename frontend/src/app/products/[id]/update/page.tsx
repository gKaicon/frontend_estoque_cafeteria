import ProductForm from "@/components/ProductForm";
import api from "@/services/api";
import { Product } from "@/lib/types";

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
  const { id } = await params; 

  const produto = await getProduct(id);

  if (!produto) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center">Produto não encontrado</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center space-y-4 max-w-lg mx-auto bg-white rounded-t-lg text-gray-700 pt-4 mt-4">
        Editar Produto: {produto.name}
      </h1>
       <ProductForm productToEdit={produto} />
    </div>
  );
}