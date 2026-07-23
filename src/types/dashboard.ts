export interface Root {
  success: boolean
  message: string
  data: DashboardStatsResponse
}

export interface DashboardStatsResponse {
  total_products: number
  total_stock_value: number
  low_stock_items: number
  total_quantity: number
}



export interface RecentStockMovementsResponse {
  id: string
  product: Product
  user: User
  type: string
  quantity: string
  quantity_before: string
  quantity_after: string
  unit_cost: string
  reference_number: string
  notes: string
  occurred_at: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  sku: string
  description: string
  reorder_level: string
  cost_price: string
  is_active: boolean
  created_at: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  created_at: string
}

export interface InventoryByCategoryResponse {
  id: string
  name: string
  total_products: number
  active_products: number
  total_quantity: number
  total_value: number
  low_stock_count: number
}


// export interface Root {
//   success: boolean
//   message: string
//   data: TopCategoriesResponse
// }

export interface TopCategoriesResponse {
  id: string
  name: string
  product_count: number
  total_quantity: number
  total_value: number
}
