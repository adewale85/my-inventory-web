import { supabase } from "@/supabase/client";
import { InventoryResponse } from "@/types/inventory";

export async function getInventory() {
    const {data, error} = await supabase
    .from("inventory")
    .select("*")
    .order("created_at", {ascending: false})

    if (error) {
        throw new Error("Error fetching inventory: " + error.message);
    }

    return data as InventoryResponse[];
}