import { RecentStockMovementsResponse } from "@/types/dashboard";
import { apiClient } from "../axiosPrivate";


/**
 * Fetch the stream of most recent activity and updates across stock operations
 */
export async function getRecentStockMovements() {
  const response = await apiClient.get<{ data: RecentStockMovementsResponse []}>("/dashboard/recent-stock-movements");
  return response.data.data;
}