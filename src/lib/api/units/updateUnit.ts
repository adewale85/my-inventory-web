import { unitOfMeasureResponse, unitOfMeasureResponsePayload } from "@/types/unit"
import { apiClient } from "../axiosPrivate"



/**
 * Update an existing unit of measure (Admin only)
 */
export async function updateUnit(id: string | number, payload: unitOfMeasureResponsePayload) {
  const response = await apiClient.put<{data: unitOfMeasureResponse}> (`/units-of-measure/${id}`, payload)
  return response.data.data
 
}