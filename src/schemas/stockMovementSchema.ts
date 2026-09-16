import { z } from "zod";

export const stockMovementSchema = z.object({
  product_id: z.string().min(1, "Please select a product"),

  type: z.enum(["IN", "OUT"]),

  quantity: z
    .number()
    .positive("Quantity must be greater than 0"),

  note: z.string().optional(),
});

export type StockMovementFormValues = z.infer<
  typeof stockMovementSchema
>;