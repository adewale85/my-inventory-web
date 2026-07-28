import { TopCategoriesResponse } from "@/types/dashboard";
import { apiClient } from "../axiosPrivate";


/**
 * Fetch your leading product categories sorted cleanly by overall financial stock valuation
 */
export async function getTopCategories() {
  const response = await apiClient.get<{ data: TopCategoriesResponse [] }>("/dashboard/top-categories");
  return response.data.data;
}