// src/lib/api/products/createProduct.ts


// import { ProductPayload, ProductResponse } from "@/types/product";
// import { apiClient } from "../axiosPrivate";


// /**
//  * Create a new product (Admin only)
//  */
// export async function createProduct(payload: ProductPayload) {
//   const response = await apiClient.post<{data: ProductResponse}>("/products", payload);
//   return response.data.data;
// }



// import { ProductFormValues } from "@/schemas/productSchema";
// import { supabase } from "@/supabase/client";

// export const createProduct = async (values: ProductFormValues) => {
//   // Separate supplier_ids if it belongs to a junction table, 
//   // or pass directly if it's a native array column in PostgreSQL
//   const { supplier_ids, ...productData } = values;

//   const { data: product, error: productError } = await supabase
//     .from("products")
//     .insert([productData])
//     .select()
//     .single();

//   if (productError) throw new Error(productError.message);

//   // If you use a junction table for many-to-many supplier relations:
//   if (supplier_ids && supplier_ids.length > 0) {
//     const supplierLinks = supplier_ids.map((supplierId) => ({
//       product_id: product.id,
//       supplier_id: supplierId,
//     }));

//     const { error: junctionError } = await supabase
//       .from("product_suppliers") // Adjust to your junction table name if applicable
//       .insert(supplierLinks);

//     if (junctionError) throw new Error(junctionError.message);
//   }

//   return product;
// };




// import { ProductFormValues } from "@/schemas/productSchema";
// import { supabase } from "@/supabase/client";

// export const createProduct = async (values: ProductFormValues) => {
//   // Separate supplier_ids from the main product fields
//   const { supplier_ids, ...productData } = values;

//   // 1. Insert the product into the products table
//   const { data: product, error: productError } = await supabase
//     .from("products")
//     .insert([productData])
//     .select()
//     .single();

//   if (productError) {
//     throw new Error(productError.message);
//   }

//   // 2. Insert supplier relations into the junction table
//   if (supplier_ids && supplier_ids.length > 0) {
//     const supplierLinks = supplier_ids.map((supplierId) => ({
//       product_id: product.id,
//       supplier_id: supplierId,
//     }));

//     const { error: junctionError } = await supabase
//       .from("product_suppliers") // Adjust table name if yours differs
//       .insert(supplierLinks);

//     if (junctionError) {
//       throw new Error(junctionError.message);
//     }
//   }

//   return product;
// };



import { supabase } from "@/supabase/client";
import { ProductFormValues } from "@/schemas/productSchema";

export const createProduct = async (values: ProductFormValues) => {
  // Destructure supplier_ids away from core product columns
  const { supplier_ids, ...productData } = values;

  // 1. Insert the product into the products table
  const { data: product, error: productError } = await supabase
    .from("products")
    .insert([productData])
    .select()
    .single();

  if (productError) {
    throw new Error(productError.message);
  }

  // 2. Insert selected suppliers into the junction table if any were checked
  if (supplier_ids && supplier_ids.length > 0) {
    const junctionRows = supplier_ids.map((supplierId) => ({
      product_id: product.id,
      supplier_id: supplierId,
    }));

    const { error: junctionError } = await supabase
      .from("product_suppliers")
      .insert(junctionRows);

    if (junctionError) {
      throw new Error(junctionError.message);
    }
  }

  return product;
};