
import { apiClient } from "../axiosPrivate";
import { SupplierResponse } from "@/types/suppliers";



/**
 * Soft-delete a supplier (Admin only)
 */
export async function deleteSupplier(id: string | number) {
const response = await apiClient.delete<{data: SupplierResponse}>(`/suppliers/${id}`)
return response.data.data
}

