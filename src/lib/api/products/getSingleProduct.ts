



import { ProductResponse } from "@/types/product";
import { apiClient } from "../axiosPrivate";

/**
 * List all products that are at or below their reorder level
 */
export async function getSingleProduct(id: string | number) {
  const response = await apiClient.get<{ data: ProductResponse }>(`/products/${id}`);
  return response.data.data;
}