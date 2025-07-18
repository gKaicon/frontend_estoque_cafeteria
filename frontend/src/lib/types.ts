// lib/types.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  sale_price: number;
  stock: number;
}

export interface ItemSell {
  id?: number;
  product_id: number;
  amount: number;
  unit_price?: number;
  subtotal?: number;
  product?: Product; // Para exibir dados do produto
}

export interface Sell {
  id: number;
  total_value: number;
  sale_date: string;
  itens: ItemSell[];
}