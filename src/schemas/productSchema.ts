import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required"),

  sku: z
    .string()
    .min(1, "SKU is required"),

  description: z.string().optional(),

  category_id: z
    .string()
    .min(1, "Category is required"),

  unit_of_measure_id: z
    .string()
    .min(1, "Unit of Measure is required"),

  reorder_level: z.coerce
    .number()
    .min(0, "Reorder level cannot be negative"),

  cost_price: z.coerce
    .number()
    .min(0, "Cost price cannot be negative"),

  is_active: z.boolean(),

  supplier_ids: z.array(z.string()),
});

export type ProductFormValues = z.infer<typeof productSchema>;