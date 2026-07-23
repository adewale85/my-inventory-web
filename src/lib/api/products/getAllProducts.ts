// src/lib/api/products/getAllProducts.ts


import { PaginatedResponse, ProductResponse } from "@/types/product";
import { apiClient } from "../axiosPrivate";

export async function getAllProducts() {
  const response = await apiClient.get<{ 
    data: PaginatedResponse<ProductResponse>;
  }>("/products");

  return response.data.data.data;
}