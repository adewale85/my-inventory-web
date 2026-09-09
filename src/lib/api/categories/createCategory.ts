
// import { apiClient } from "../axiosPrivate";
// import { CategoryPayload, CategoryResponse } from "@/types/categories";


// /**
//  * Create a new category (Admin only)
//  */
// export async function createCategory(payload: CategoryPayload) {
//   const response = await apiClient.post<{ data: CategoryResponse }>("/categories", payload);
//   return response.data.data;
// }




// import { supabase } from "@/supabase/client";
// import {
//   CategoryFormValues,
// } from "@/schemas/categoriesSchema";

// export async function createCategory(values: CategoryFormValues) {
//   const { data, error } = await supabase
//     .from("categories")
//     .insert([values])
//     .select()
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// }




import { supabase } from "@/supabase/client";
import { CategoryFormValues } from "@/schemas/categoriesSchema";

export async function createCategory(values: CategoryFormValues) {
  const { data, error } = await supabase
    .from("categories")
    .insert([values])
    .select()
    .single();

   if (error) {
    console.log("CREATE CATEGORY ERROR:", error);
    throw new Error(error.message);
  }
  return data;
}