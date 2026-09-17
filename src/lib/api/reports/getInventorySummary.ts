// import { InventorySummaryResponse } from "@/types/report";
// import { apiClient } from "../axiosPrivate";



// export async function getInventorySummary() {
//   const response = await apiClient.get<{ data: InventorySummaryResponse }>("/reports/inventory-summary");
//   return response.data.data;
// }




import { supabase } from "@/supabase/client";

export async function getInventoryReport() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      sku,
      cost_price,
      reorder_level,
      category_id,
      inventory (
      quantity
      )
    `)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(
      "Error fetching inventory report: " + error.message
    );
  }

  return data;
}


