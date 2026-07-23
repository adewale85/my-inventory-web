
import { apiClient } from "../axiosPrivate";
import { CategoryResponse } from "@/types/categories";


/**
 * Delete a category completely (Admin only)
 */
export async function deleteCategory(id: string | number) {
  const response = await apiClient.delete<{ data: CategoryResponse }>(`/categories/${id}`);
  return response.data.data;
}