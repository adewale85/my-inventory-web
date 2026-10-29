export type PaymentMethod = "Cash" | "Bank Transfer";

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
  products?: {
    id: string;
    name: string;
    sku: string;
  } | null;
}

export interface Sale {
  id: string;
  sold_by: string;
  customer_name: string | null;
  customer_contact: string | null;
  payment_method: string;
  total_amount: number;
  created_at: string;
  sale_items?: SaleItem[];
  cashier_name?: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  sku: string;
  sellingPrice: number;
  availableStock: number;
  quantity: number;
}

export interface ProcessSaleItemPayload {
  product_id: string;
  productId?: string;
  quantity: number;
  unit_price: number;
  selling_price?: number;
  price?: number;
}

export interface ProcessSalePayload {
  items: CartItem[];
  paymentMethod: PaymentMethod;
  customerName?: string;
  customerContact?: string;
}

