// src/lib/api/products/getAllProducts.ts


// import { PaginatedResponse, ProductResponse } from "@/types/product";
// import { apiClient } from "../axiosPrivate";

// export async function getAllProducts() {
//   const response = await apiClient.get<{ 
//     data: PaginatedResponse<ProductResponse>;
//   }>("/products");

//   return response.data.data.data;
// }


// import { supabase } from "@/supabase/client";

// export const getProducts = async () => {
//   const { data, error } = await supabase
//     .from("products")
//     .select(`
//       id,
//       name,
//       sku,
//       description,
//       reorder_level,
//       cost_price,
//       is_active,
//       created_at,
//       categories:category_id (id, name),
//       units:unit_of_measure_id (id, name, abbreviation),
//       product_suppliers (
//         supplier_id,
//         suppliers (id, name)
//       )
//     `)
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Error fetching products:", error.message);
//     throw new Error(error.message);
//   }

//   return data || [];
// };


import { supabase } from "@/supabase/client";

export async function getAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}