import { supabase } from "@/supabase/client";

/**
 * Delete a category completely (Admin only)
 */
export async function deleteCategory(id: string | number) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", String(id));

  if (error) {
    throw new Error(error.message);
  }

  return true;
}