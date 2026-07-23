import { unitOfMeasureResponse } from "@/types/unit";
import { apiClient } from "../axiosPrivate";



/**
 * Delete a unit of measure completely (Admin only)
 */
export async function deleteUnit(id: string | number) {
  const response = await apiClient.delete <{data: unitOfMeasureResponse}> (`/units-of-measure/${id}`)
  return response.data.data
}