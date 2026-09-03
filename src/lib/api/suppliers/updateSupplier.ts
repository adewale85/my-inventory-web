import { supabase } from "@/supabase/client";
import {
  SupplierResponse,
  SupplierResponsePayload,
} from "@/types/suppliers";

export async function updateSupplier(
  id: string,
  payload: SupplierResponsePayload
) {
  const { data, error } = await supabase
    .from("suppliers")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("No supplier was updated.");
  }

  return data[0] as SupplierResponse;
}