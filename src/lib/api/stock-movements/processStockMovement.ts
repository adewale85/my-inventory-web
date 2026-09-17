import { supabase } from "@/supabase/client";
import { StockMovementPayload, StockMovementResponse } from "@/types/stockMovement";

export async function processStockMovement (payload: StockMovementPayload) {
    const {data, error} = await supabase.rpc("process_stock_movement", {
        p_product_id: payload.product_id,
        p_quantity: payload.quantity,
        p_type: payload.type,
        p_note: payload.note,
       
    });

    if (error) {
        throw new Error ("Error processing stock movement: " + error.message);
    }

    return data as StockMovementResponse;
}