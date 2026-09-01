
// import { apiClient } from "../axiosPrivate";
// import { SupplierResponse } from "@/types/suppliers";


// /**
//  * List all suppliers
//  */
// export async function getAllSuppliers() {
//  const response = await apiClient.get<{data: SupplierResponse[]}>("/suppliers")
//  return response.data.data  
// }


import { supabase } from "@/supabase/client";
import { SupplierResponse } from "@/types/suppliers";



export async function getAllSuppliers() {
    const {data, error} = await supabase
    .from ("suppliers")
    .select("*")
    .order("created_at", {ascending: false});

    if (error) {
        throw new Error (error.message)
    }

    return data as SupplierResponse[]
}