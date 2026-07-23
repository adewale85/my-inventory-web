// import { apiClient } from "../client";

import { StockMovementResponse } from "@/types/stockMovement";
import { apiClient } from "../axiosPrivate";

export async function getAllStockMovements(){
  const response = await apiClient.get<{data: StockMovementResponse[]}>("/stock-movements")
  return response.data.data
}