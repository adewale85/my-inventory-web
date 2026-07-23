// src/lib/api/products/createProduct.ts


import { ProductPayload, ProductResponse } from "@/types/product";
import { apiClient } from "../axiosPrivate";


/**
 * Create a new product (Admin only)
 */
export async function createProduct(payload: ProductPayload) {
  const response = await apiClient.post<{data: ProductResponse[]}>("/products", payload);
  return response.data.data;
}