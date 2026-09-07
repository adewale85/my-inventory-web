"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CategoryFormValues } from "@/schemas/categoriesSchema";

interface CategoryFormProps {
  form: UseFormReturn<CategoryFormValues>;
}

export default function CategoryForm({ form }: CategoryFormProps) {
  return (
    <>
      {/* Category Name */}
      <div className="grid gap-2">
        <Label htmlFor="name">Category Name</Label>

        <Input
          id="name"
          placeholder="e.g. Beverages"
          {...form.register("name")}
        />

        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>

        <Input
          id="description"
          placeholder="e.g. Drinks and beverages"
          {...form.register("description")}
        />

        {form.formState.errors.description && (
          <p className="text-sm text-red-500">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <input
          id="active"
          type="checkbox"
          {...form.register("is_active")}
        />

        <Label htmlFor="active">Active Category</Label>
      </div>
    </>
  );
}