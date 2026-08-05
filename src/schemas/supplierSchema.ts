import { z } from "zod";

export const supplierSchema = z.object({
  name: z
    .string()
    .min(1, "Supplier name is required"),

  contact_person: z
    .string()
    .min(1, "Contact person is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  phone: z
    .string()
    .min(1, "Phone number is required"),

  address: z
    .string()
    .min(1, "Address is required"),

  is_active: z.boolean(),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;