
// import { SupplierResponse, SupplierResponsePayload } from "@/types/suppliers";
// import { apiClient} from "../axiosPrivate";


// /**
//  * Create a new supplier (Admin only)
//  */
// export async function createSupplier(payload: SupplierResponsePayload) {
// const response = await apiClient.post<{data: SupplierResponse} >("/suppliers", payload);
// return response.data.data;
// }



import { SupplierResponse, SupplierResponsePayload } from "@/types/suppliers";
import { supabase } from "@/supabase/client";

/**
 * Create a new supplier
 */
export async function createSupplier(
  payload: SupplierResponsePayload
) {
  const { data, error } = await supabase
    .from("suppliers")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as SupplierResponse;
}