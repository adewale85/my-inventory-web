
import { StockMovementResponse } from "@/types/stockMovement";
import { apiClient} from "../axiosPrivate";


/**
 * Show details for a single specific stock movement entry
 */
export async function getSingleStockMovement(id: string | number){
  const response = await apiClient.get<{data: StockMovementResponse}>(`/stock-movements/${id}`)
  return response.data.data

}