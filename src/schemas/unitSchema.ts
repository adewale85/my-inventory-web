import { z } from "zod";

export const unitSchema = z.object({
  name: z
    .string()
    .min(1, "Unit name is required"),

  abbreviation: z
    .string()
    .min(1, "Abbreviation is required"),
});

export type UnitFormValues = z.infer<typeof unitSchema>;