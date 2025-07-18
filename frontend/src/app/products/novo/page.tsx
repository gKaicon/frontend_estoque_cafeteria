// src/app/produtos/novo/page.tsx
import ProdutoForm from "@/components/ProductForm";

export default function NovoProdutoPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Cadastro de Novo Produto
      </h1>
      <ProdutoForm />
    </div>
  );
}