import { DashboardStatsResponse } from "@/types/dashboard";
import { apiClient } from "../axiosPrivate";


/**
 * Fetch core dashboard overview figures (totals for products, value, low stock, quantities)
 */
export async function getDashboardStats() {
  const response = await apiClient.get<{ data: DashboardStatsResponse }>("/dashboard/stats");
  return response.data.data;
}