// import { SupplierResponse } from "@/types/suppliers";
// import { apiClient } from "../axiosPrivate";


// /**
//  * Show details for a single supplier
//  */
// export async function getSingleSupplier (id: string | number) {
//   const response = await apiClient.get<{data: SupplierResponse}>(`/suppliers/${id}`)
//   return response.data.data
// }

import { supabase } from "@/supabase/client";
import { SupplierResponse } from "@/types/suppliers";

export async function getSingleSupplier (id: string) {
  const {data, error} = await supabase
  .from("suppliers")
  .select("*")
  .eq("id", id)
  .single();

  if (error) {
    throw new Error (error.message)
  }

  return data as SupplierResponse
}
