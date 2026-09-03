// src/lib/api/products/deleteProduct.ts

import { supabase } from "@/supabase/client"

// import { apiClient } from "../axiosPrivate";

// /**
//  * Delete a product by its ID (Admin only)
//  */
// export async function deleteProduct(id: string) {
//   // Axios .delete handles removing items by appending the ID to the URL path
//   const response = await apiClient.delete(`/products/${id}`);
//   return response.data.data;
// }



export const deleteProduct = async (id: string) => {
  const {error} = await supabase
  .from ("products")
  .delete()
  .eq("id", id);
  if (error) throw error;
  return true;
}