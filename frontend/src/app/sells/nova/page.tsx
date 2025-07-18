// app/sells/nova/page.tsx
import SellForm from '@/components/SellForm';

export default function NovaVendaPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Nova Venda</h1>
      <SellForm />
    </div>
  );
}