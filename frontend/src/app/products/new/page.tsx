import ProdutoForm from "@/components/ProductForm";

export default function NovoProdutoPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center space-y-4 max-w-lg mx-auto bg-white rounded-t-lg text-gray-700 pt-4 mt-4">
        Cadastro de Novo Produto
      </h1>
      <ProdutoForm />
    </div>
  );
}