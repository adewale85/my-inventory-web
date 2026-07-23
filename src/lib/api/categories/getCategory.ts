import { CategoryResponse } from "@/types/categories";
import { apiClient } from "../axiosPrivate";


/**
 * Show details for a single category
 */
export async function getCategory(id: string | number) {
  const response = await apiClient.get<{ data: CategoryResponse }>(`/categories/${id}`);
  return response.data.data;
}