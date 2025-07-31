import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='flex items-center justify-center'>
      <div className="container text-center px-8 py-14 rounded-2xl m-28 w-9/12" style={{backgroundColor: 'rgba(255, 255, 255, 0.60)'}}>
        <h1 className="text-5xl font-extrabold text-black mb-4">
          Bem-vindo ao Sistema de Gestão
        </h1>
        <p className="text-xl text-black mb-12">
          Gerencie seus produtos e vendas de forma simples e eficiente.
        </p>
        <div className="flex justify-center gap-8">
          <Link href="/sells/" className="group block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 transition-all">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
              Realizar Nova Venda
            </h5>
            <p className="font-normal text-black">
              Crie um novo registro de venda e atualize seu estoque automaticamente.
            </p>
          </Link>
          <Link href="/products/" className="group block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 transition-all">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
              Gerenciar Produtos
            </h5>
            <p className="font-normal text-black">
              Adicione, visualize, edite e remova produtos do seu inventário.
            </p>
          </Link>
          <Link href="/buys/" className="group block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 transition-all">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
              Realizar Nova Compra
            </h5>
            <p className="font-normal text-black">
              Crie um novo registro de compra e atualize seu estoque automaticamente.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}