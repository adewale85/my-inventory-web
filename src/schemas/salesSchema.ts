import { z } from "zod";

export const paymentMethodSchema = z.enum(["Cash", "Bank Transfer"]);

export const customerFormSchema = z.object({
  customerName: z
    .string()
    .trim()
    .max(100, "Customer name cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  customerContact: z
    .string()
    .trim()
    .max(100, "Customer contact cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
});

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product identifier is required"),
  productName: z.string().min(1, "Product name is required"),
  sku: z.string(),
  sellingPrice: z.number().positive("Selling price must be greater than zero"),
  availableStock: z.number().min(0, "Available stock cannot be negative"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;
export type CartItemValues = z.infer<typeof cartItemSchema>;

