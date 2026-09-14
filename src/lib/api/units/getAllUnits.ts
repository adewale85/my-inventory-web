// import { unitOfMeasureResponse } from "@/types/unit";
// import { apiClient} from "../axiosPrivate";

import { supabase } from "@/supabase/client";
import { unitOfMeasureResponse} from "@/types/unit";


/**
 * List all units of measure
 */
// export async function getAllUnits() {
//   const response = await apiClient.get<{data: unitOfMeasureResponse[]}>("/units-of-measure")
//   return response.data.data
// }


export async function getAllUnits() {
  const {data, error} = await supabase
  .from ("units")
  .select("*")
  .order("created_at", {ascending: false});

  if (error) {
    throw new Error(error.message);
  }

  return data as unitOfMeasureResponse[];
}



/**
 * Create a new unit of measure
 */
// export async function createUnit(
//   payload: unitOfMeasureResponsePayload
// ) {
//   const { data, error } = await supabase
//     .from("units")
//     .insert(payload)
//     .select()
//     .single()

//   if (error) throw error

//   return data as unitOfMeasureResponse
// }