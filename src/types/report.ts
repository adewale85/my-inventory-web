export interface InventorySummaryResponse {
  total_products: number
  active_products: number
  low_stock_count: number
  by_category: ByCategory[]
}

export interface ByCategory {
  category: string
  product_count: number
}



export interface StockValueItem {
  id: string
  name: string
  sku: string
  cost_price: string
  quantity_on_hand: string
  total_value: string
}

export interface StockValueResponse {
  items: StockValueItem[]
  grand_total: number
}