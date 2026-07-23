import {  CategoryResponse } from "@/types/categories";
import { apiClient } from "../axiosPrivate";


/**
 * List all product categories
 */
export async function getCategories() {
  const response = await apiClient.get<{data:{ data: CategoryResponse[] }}>("/categories");
  return response.data.data.data;
}