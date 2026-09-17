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
  

  const {data: products, error: inventoryError} = await supabase
  .from ("products")
  .select (`
    cost_price,
    inventory (
    quantity
    )
  `);

  if (inventoryError) {
    throw new Error ("Error fetching stock value:" + inventoryError.message)
  }

  console.log("Dashboard products:", products);


    const totalStockValue = 
    products?.reduce((total, product)=>{
    const quantity = product.inventory?.quantity;
    const costPrice = product.cost_price ?? 0;

    return total + Number(quantity) * Number(costPrice)
  }, 0) ?? 0;


  const totalQuantity = 
    products?.reduce((total, product) => {
    const quantity = product.inventory?.quantity ?? 0;

    return total + Number(quantity);
  }, 0) ?? 0;

  return {
    total_products: count ?? 0,
    total_stock_value: totalStockValue,
    total_quantity: totalQuantity
  };
}