import { ProductResponse } from "@/types/product";

export const mockProducts: ProductResponse[] = [
  {
    id: "1",
    name: "Rice",
    sku: "SKU-001",
    description: "Premium long grain rice",
    category: {
      id: "1",
      name: "Grains",
      description: "it reach",
      products_count: 2,
      created_at: "2026-07-29T10:00:00Z"
    },
    unit_of_measure: "Bag",
    reorder_level: "20",
    cost_price: "25000",
    is_active: true,
    stock_level: {
      quantity_on_hand: "120",
      last_updated_at: "2026-07-29T10:00:00Z",
    },
    created_at: "2026-07-29T10:00:00Z",
  },
  {
    id: "2",
    name: "Milk",
    sku: "SKU-002",
    description: "Fresh dairy milk",
    category: {
      id: "2",
      name: "Dairy",
       description: "it reach",
      products_count: 2,
      created_at: "2026-07-29T10:00:00Z"
    },
    unit_of_measure: "Carton",
    reorder_level: "10",
    cost_price: "1800",
    is_active: true,
    stock_level: {
      quantity_on_hand: "45",
      last_updated_at: "2026-07-29T10:00:00Z",
    },
    created_at: "2026-07-29T10:00:00Z",
  },
  {
    id: "3",
    name: "Coca-Cola",
    sku: "SKU-003",
    description: "Soft drink",
    category: {
      id: "3",
      name: "Beverages",
       description: "it reach",
      products_count: 2,
      created_at: "2026-07-29T10:00:00Z"
    },
    unit_of_measure: "Bottle",
    reorder_level: "30",
    cost_price: "600",
    is_active: false,
    stock_level: {
      quantity_on_hand: "0",
      last_updated_at: "2026-07-29T10:00:00Z",
    },
    created_at: "2026-07-29T10:00:00Z",
  },
];