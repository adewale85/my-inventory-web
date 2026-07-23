import { SupplierResponse } from "@/types/suppliers";
import { apiClient } from "../axiosPrivate";



/**
 * Show details for a single supplier
 */
export async function getSingleSupplier (id: string | number) {
  const response = await apiClient.get<{data: SupplierResponse}>(`/suppliers/${id}`)
  return response.data.data
}

