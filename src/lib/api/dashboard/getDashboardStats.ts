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
    reorder_level,
    inventory (
    quantity
    )
  `);

  if (inventoryError) {
    throw new Error ("Error fetching stock value:" + inventoryError.message)
  }


  products?.forEach((product) => {
  console.log(
    "Cost Price:",
    product.cost_price,
    "Quantity:",
    product.inventory?.quantity
  );
});

   const totalStockValue =
  products?.reduce((total, product) => {
    const quantity = Number(product.inventory?.quantity ?? 0);
    const costPrice = Number(product.cost_price ?? 0);

    return total + quantity * costPrice;
  }, 0) ?? 0;


  const totalQuantity =
  products?.reduce((total, product) => {
    const quantity = Number(product.inventory?.quantity ?? 0);

    return total + quantity;
  }, 0) ?? 0;

  

  const lowStockitems = 
  products?.filter ((product) => {
    const quantity = Number (product.inventory?.quantity ?? 0)
    const reorderLevel = Number (product.reorder_level ?? 0)

    return quantity < reorderLevel;
  }, ).length ?? 0;

 
  return {    
    total_products: count ?? 0,
    total_stock_value: totalStockValue,
    total_quantity: totalQuantity,
    low_stock_items: lowStockitems
  };
}