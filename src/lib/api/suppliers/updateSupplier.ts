
import { SupplierResponse, SupplierResponsePayload } from "@/types/suppliers";
import { apiClient } from "../axiosPrivate";


/**
 * Update an existing supplier's information (Admin only)
 */
export async function updateSupplier(id: string | number, payload: SupplierResponsePayload) {
  const response = await apiClient.put<{data: SupplierResponse}>(`/suppliers/${id}`, payload)
  return response.data.data;
}