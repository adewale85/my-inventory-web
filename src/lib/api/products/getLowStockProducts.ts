


import { ProductResponse } from "@/types/product";
import { apiClient } from "../axiosPrivate";

export async function getLowStockProducts() {
  const response = await apiClient.get<{ data: ProductResponse}>("/products/low-stock");
  return response.data.data;
}   



