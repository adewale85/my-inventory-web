// import {  CategoryResponse } from "@/types/categories";
// import { apiClient } from "../axiosPrivate";


/**
 * List all product categories
 */
// export async function getAllCategories() {
//   const response = await apiClient.get<{data:{ data: CategoryResponse[] }}>("/categories");
//   return response.data.data.data;
// }


import { supabase } from "@/supabase/client";


export async function getAllCategories() {
  const {data, error} = await supabase
  .from ("categories")
  .select ('*')
  .order ("created_at", {ascending: false});

  if (error) {
    throw new Error(error.message)
  }
  return data;
} 