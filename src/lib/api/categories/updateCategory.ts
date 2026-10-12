import { supabase } from "@/supabase/client";
import { CategoryFormValues } from "@/schemas/categoriesSchema";

/**
 * Update an existing category in Supabase
 */
export async function updateCategory(
  id: string,
  values: CategoryFormValues
) {
  const { data, error } = await supabase
    .from("categories")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log("UPDATE CATEGORY ERROR:", error);
    throw new Error(error.message);
  }

  return data;
}