import {CategoryPayload, CategoryResponse } from "@/types/categories";
import { apiClient } from "../axiosPrivate";


/**
 * Update an existing category name (Admin only)
 */
export async function updateCategory(id: string | number, payload: CategoryPayload) {
  const response = await apiClient.put<{ data: CategoryResponse }>(`/categories/${id}`, payload);
  return response.data.data;
}