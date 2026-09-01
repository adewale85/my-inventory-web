
// import { apiClient } from "../axiosPrivate";
// import { SupplierResponse } from "@/types/suppliers";

import { supabase } from "@/supabase/client"



// /**
//  * Soft-delete a supplier (Admin only)
//  */
// export async function deleteSupplier(id: string | number) {
// const response = await apiClient.delete<{data: SupplierResponse}>(`/suppliers/${id}`)
// return response.data.data
// }


export const deleteSupplier = async (id:string) => {
    const {error} = await supabase
    .from ('suppliers')
    .delete()
    .eq('id', id);

    if (error) {
        throw new Error
    }
    return true
}