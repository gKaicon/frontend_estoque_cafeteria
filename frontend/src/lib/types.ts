export interface Product {
  id: number;
  name: string;
  description: string;
  sale_price: number;
  stock: number;
}

export interface ItemBuy {
  id?: number;
  product_id: number;
  amount: number;
  unit_price?: number;
  subtotal?: number;
  product?: Product;
}

export interface ItemSell {
  id?: number;
  product_id: number;
  amount: number;
  unit_price?: number;
  subtotal?: number;
  product?: Product; 
}

export interface Sell {
  id: number;
  total_value: number;
  sale_date: string;
  itens: ItemSell[];
}

export interface Buy {
  id: number;
  total_value: number;
  purchase_date: string;
  itens: ItemBuy[];
}