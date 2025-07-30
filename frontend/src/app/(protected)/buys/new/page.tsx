import BuyForm from '@/components/BuyForm';

export default function NovaCompraPage() {
  return (
    <div className="container mx-auto p-8 bg-white text-gray-700 rounded my-12">
      <h1 className="text-2xl font-bold mb-4">Criar Nova Compra</h1>
      <BuyForm />
    </div>
  );
}