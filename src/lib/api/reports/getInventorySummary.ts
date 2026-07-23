import { InventorySummaryResponse } from "@/types/report";
import { apiClient } from "../axiosPrivate";


/**
 * Fetch inventory metrics summary grouped by category (Admin only)
 */
export async function getInventorySummary() {
  const response = await apiClient.get<{ data: InventorySummaryResponse }>("/reports/inventory-summary");
  return response.data.data;
}




