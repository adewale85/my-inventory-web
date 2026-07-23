import { StockMovementPayload, StockMovementResponse } from "@/types/stockMovement";
import { apiClient } from "../axiosPrivate";



/**
 * Record a brand new stock movement (add stock, reduce stock, adjustment)
 */
export async function recordStockMovement(payload: StockMovementPayload) {
const response = await apiClient.post<{data: StockMovementResponse}>("/stock-movements", payload)
  return response.data.data;
}

