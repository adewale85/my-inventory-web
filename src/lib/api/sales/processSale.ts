import { supabase } from "@/supabase/client";
import { ProcessSalePayload } from "@/types/sales";

/**
 * Executes the secure PostgreSQL function public.process_sale
 * Validates authentication, stock, quantities, and selling prices,
 * deducts inventory, records stock movements, and generates the sale record
 * in a single atomic database transaction.
 */
export async function processSale(payload: ProcessSalePayload): Promise<string> {
  if (!payload.items || payload.items.length === 0) {
    throw new Error("Cart cannot be empty.");
  }

  // Ensure each item has a valid positive quantity and valid selling price
  for (const item of payload.items) {
    if (!item.productId) {
      throw new Error(`Invalid item: Missing product identifier.`);
    }
    if (item.quantity <= 0) {
      throw new Error(`Quantity for "${item.productName || item.productId}" must be at least 1.`);
    }
    if (item.sellingPrice <= 0) {
      throw new Error(`Item "${item.productName || item.productId}" does not have a valid selling price.`);
    }
    if (item.availableStock !== undefined && item.quantity > item.availableStock) {
      throw new Error(
        `Quantity requested for "${item.productName}" (${item.quantity}) exceeds available stock (${item.availableStock}).`
      );
    }
  }

  // Construct JSONB payload with both snake_case and camelCase compatibility
  const p_items = payload.items.map((item) => ({
    product_id: item.productId,
    productId: item.productId,
    quantity: item.quantity,
    unit_price: item.sellingPrice,
    selling_price: item.sellingPrice,
    price: item.sellingPrice,
  }));

  const p_payment_method = payload.paymentMethod === "Cash" ? "cash" : "bank_transfer";
  const p_customer_name = payload.customerName?.trim() || null;
  const p_customer_contact = payload.customerContact?.trim() || null;

  const { data, error } = await supabase.rpc("process_sale", {
    p_items,
    p_payment_method,
    p_customer_name,
    p_customer_contact,
  });

  if (error) {
    throw new Error(error.message || "Failed to process sale in database.");
  }

  if (!data) {
    throw new Error("Sale process failed: No sale reference returned.");
  }

  return String(data);
}

