
import { SupplierResponse, SupplierResponsePayload } from "@/types/suppliers";
import { apiClient} from "../axiosPrivate";


/**
 * Create a new supplier (Admin only)
 */
export async function createSupplier(payload: SupplierResponsePayload) {
const response = await apiClient.post<{data: SupplierResponse} >("/suppliers", payload);
return response.data.data;
}

