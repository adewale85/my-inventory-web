import { unitOfMeasureResponse } from "@/types/unit";
import { apiClient} from "../axiosPrivate";


/**
 * List all units of measure
 */
export async function getAllUnits() {
  const response = await apiClient.get<{data: unitOfMeasureResponse[]}>("/units-of-measure")
  return response.data.data
}