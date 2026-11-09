import { supabase } from "@/supabase/client";
import { Sale } from "@/types/sales";

/**
 * Fetch sales history with related sale items and products.
 * Uses existing Supabase RLS policies:
 * - Regular users see only their own sales
 * - Admins see all sales
 */
export async function getSales(): Promise<Sale[]> {
  const { data: salesData, error: salesError } = await supabase
    .from("sales")
    .select(`
      id,
      sold_by,
      customer_name,
      customer_contact,
      payment_method,
      total_amount,
      created_at,
      sale_items (
        id,
        sale_id,
        product_id,
        quantity,
        unit_price,
        subtotal,
        created_at,
        products (
          id,
          name,
          sku
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (salesError) {
    throw new Error("Error fetching sales history: " + salesError.message);
  }

  // Gracefully fetch cashier names from profiles table if accessible
  const userMap = new Map<string, string>();
  try {
    const { data: profiles } = await supabase.from("profiles")
    .select("id, name");
    if (profiles && Array.isArray(profiles)) {
      profiles.forEach((p) => {
        if (p.id && p.name) {
          userMap.set(p.id, p.name);
        }
      });
    }
  } catch {
    // Ignore profile resolution error if restricted by RLS
  }

  const salesWithCashier: Sale[] = (salesData || []).map((sale: any) => ({
    id: sale.id,
    sold_by: sale.sold_by,
    customer_name: sale.customer_name,
    customer_contact: sale.customer_contact,
    payment_method: sale.payment_method,
    total_amount: Number(sale.total_amount ?? 0),
    created_at: sale.created_at,
    cashier_name: userMap.get(sale.sold_by),
    sale_items: (sale.sale_items || []).map((item: any) => {
      // In Supabase, 1-to-1 relations can return an object or single item in array
      const productObj = item.products
        ? Array.isArray(item.products)
          ? item.products[0]
          : item.products
        : null;

      return {
        id: item.id,
        sale_id: item.sale_id,
        product_id: item.product_id,
        quantity: Number(item.quantity ?? 0),
        unit_price: Number(item.unit_price ?? 0),
        subtotal: Number(item.subtotal ?? 0),
        created_at: item.created_at,
        products: productObj,
      };
    }),
  }));

  return salesWithCashier;
}

