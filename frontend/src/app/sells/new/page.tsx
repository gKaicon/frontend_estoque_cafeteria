import SellForm from '@/components/SellForm';

export default function NovaVendaPage() {
  return (
    <div className="container mx-auto p-8 bg-white text-gray-700 rounded my-12">
      <h1 className="text-2xl font-bold mb-4">Criar Nova Venda</h1>
      <SellForm />
    </div>
  );
}