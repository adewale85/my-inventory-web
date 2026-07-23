import { InventoryByCategoryResponse } from "@/types/dashboard";
import { apiClient } from "../axiosPrivate";


/**
 * Fetch the exact volume distribution breakdown of physical inventory per category
 */
export async function getInventoryByCategory() {
  const response = await apiClient.get<{ data: InventoryByCategoryResponse[] }>("/dashboard/inventory-by-category");
  return response.data.data;
}