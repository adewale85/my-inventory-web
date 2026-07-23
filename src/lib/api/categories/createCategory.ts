
import { apiClient } from "../axiosPrivate";
import { CategoryPayload, CategoryResponse } from "@/types/categories";


/**
 * Create a new category (Admin only)
 */
export async function createCategory(payload: CategoryPayload) {
  const response = await apiClient.post<{ data: CategoryResponse }>("/categories", payload);
  return response.data.data;
}