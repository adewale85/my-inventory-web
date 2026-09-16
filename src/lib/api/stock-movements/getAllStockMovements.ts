// import { apiClient } from "../client";

import { supabase } from "@/supabase/client";
import { StockMovementResponse } from "@/types/stockMovement";



// export async function getAllStockMovements(){
//   const response = await apiClient.get<{data: StockMovementResponse[]}>("/stock-movements")
//   return response.data.data


export async function getAllStockMovements() {
  const {data, error} = await supabase
  .from ("stock_movements")
  .select("*")
  .order("created_at", {ascending: false})

  if (error) {
    throw new Error("Error fetching stock movements: " + error.message);
  }

  return  data as StockMovementResponse[];
}