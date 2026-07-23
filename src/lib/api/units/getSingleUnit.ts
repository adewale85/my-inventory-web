import { unitOfMeasureResponse } from "@/types/unit";
import { apiClient } from "../axiosPrivate";
/**
 * Show details for a single unit of measure
 */
export async function getSingleUnit(id: string | number) {
  const response = await apiClient.get<{data: unitOfMeasureResponse}>(`/units-of-measure/${id}`)
  return response.data.data
}



