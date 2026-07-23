// 1. Import the existing types you already created!

import { CategoryResponse } from "./categories";

export interface ProductPayload {
  name: string
  sku: string
  description: string
  category_id: string
  unit_of_measure_id: string
  reorder_level: number
  cost_price: number
  is_active: boolean
  supplier_ids: string[]
}

export interface StockLevel {
  quantity_on_hand: string;
  last_updated_at?: string;
}


export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
}

// 2. Rename 'Daum' to 'ProductResponse' (Much cleaner!)
export interface ProductResponse {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: CategoryResponse;     // Uses your imported category type
  unit_of_measure: string; // Uses your imported UOM type
  reorder_level: string;
  cost_price: string;
  is_active: boolean; 
  stock_level: StockLevel;
  created_at: string;
}

// 3. Rename 'Root' to 'PaginatedProductsApiResponse' so you know what it is
// export interface PaginatedProductsApiResponse {
//   success: boolean;
//   message: string;
//   data: {
//     data: ProductResponse[]; // Your clean list of products
   
//   };
// }


