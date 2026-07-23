import { StockValueResponse } from "@/types/report";
import { apiClient } from "../axiosPrivate";


/**
 * Fetch total monetary/stock value assessment reports (Admin only)
 */
export async function getStockValue() {
  const response = await apiClient.get<{ data: StockValueResponse }>("/reports/stock-value");
  return response.data.data;
}