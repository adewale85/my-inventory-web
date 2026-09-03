// import { supabase } from "@/supabase/client";
// import { ProductFormValues } from "@/schemas/productSchema";

// export const updateProduct = async (
//   id: string,
//   values: ProductFormValues
// ) => {
//   const { supplier_ids, ...productData } = values;

//   // 1. Update the product
//   const { error: productError } = await supabase
//     .from("products")
//     .update(productData)
//     .eq("id", id);

//   if (productError) {
//     throw new Error(productError.message);
//   }

//   // 2. Remove existing supplier relationships
//   const { error: deleteSupplierError } = await supabase
//     .from("product_suppliers")
//     .delete()
//     .eq("product_id", id);

//   if (deleteSupplierError) {
//     throw new Error(deleteSupplierError.message);
//   }

//   // 3. Add the new supplier relationships
//   if (supplier_ids && supplier_ids.length > 0) {
//     const supplierLinks = supplier_ids.map((supplierId) => ({
//       product_id: id,
//       supplier_id: supplierId,
//     }));

//     const { error: supplierError } = await supabase
//       .from("product_suppliers")
//       .insert(supplierLinks);

//     if (supplierError) {
//       throw new Error(supplierError.message);
//     }
//   }

//   return { id, ...productData };
// };


import { supabase } from "@/supabase/client";
import { ProductFormValues } from "@/schemas/productSchema";

export const updateProduct = async (
  id: string,
  values: ProductFormValues
) => {
  console.log("UPDATE PRODUCT CALLED");
  console.log("Product ID:", id);
  console.log("Values:", values);

  const { supplier_ids, ...productData } = values;

  console.log("Product data being updated:", productData);

  const { data, error: productError } = await supabase
    .from("products")
    .update(productData)
    .eq("id", id)
    .select();

  console.log("Supabase update response:", data);
  console.log("Supabase update error:", productError);

  if (productError) {
    throw new Error(productError.message);
  }

  if (!data || data.length === 0) {
    throw new Error("No product was updated. Check the product ID and permissions.");
  }

  // Update supplier relationships
  const { error: deleteSupplierError } = await supabase
    .from("product_suppliers")
    .delete()
    .eq("product_id", id);

  if (deleteSupplierError) {
    throw new Error(deleteSupplierError.message);
  }

  if (supplier_ids && supplier_ids.length > 0) {
    const supplierLinks = supplier_ids.map((supplierId) => ({
      product_id: id,
      supplier_id: supplierId,
    }));

    const { error: supplierError } = await supabase
      .from("product_suppliers")
      .insert(supplierLinks);

    if (supplierError) {
      throw new Error(supplierError.message);
    }
  }

  return data[0];
};