
import { unitOfMeasureResponse, unitOfMeasureResponsePayload } from "@/types/unit";
import { apiClient } from "../axiosPrivate";



/**
 * Create a unit of measure (Admin only)
 */
export async function createUnit(payload: unitOfMeasureResponsePayload) {
  const response = await apiClient.post<{data: unitOfMeasureResponse}>("/units-of-measure", payload);
  return response.data.data;
}

