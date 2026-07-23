
import { apiClient } from "../axiosPrivate";
import { SupplierResponse } from "@/types/suppliers";



/**
 * List all suppliers
 */
export async function getAllSuppliers() {
 const response = await apiClient.get<{data: SupplierResponse[]}>("/suppliers")
 return response.data.data  
}



