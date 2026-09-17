// import { DashboardStatsResponse } from "@/types/dashboard";
// import { apiClient } from "../axiosPrivate";



/**
 * Fetch core dashboard overview figures (totals for products, value, low stock, quantities)
 */
// export async function getDashboardStats() {
//   const response = await apiClient.get<{ data: DashboardStatsResponse }>("/dashboard/stats");
//   return response.data.data;
// }

import { supabase } from "@/supabase/client";


export async function getDashboardStats () {
  const {count, error} = await supabase
  .from ("products")
  .select ("*", { count: "exact", head: true });

  if (error) {
    throw new Error (
      "Error fetching total products: " + error.message
    );
  }
  
  return{
    total_products: count ?? 0,
  };
}