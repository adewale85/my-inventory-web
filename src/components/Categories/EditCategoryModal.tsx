"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import CategoryForm from "./CategoryForm";

import {
  CategoryFormValues,
  categorySchema,
} from "@/schemas/categoriesSchema";

import { CategoryResponse } from "@/types/categories";
import { useUpdateCategory } from "@/hooks/categories/useUpdateCategory";

interface EditCategoryModalProps {
  category: CategoryResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditCategoryModal({
  category,
  open,
  onOpenChange,
}: EditCategoryModalProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      is_active: true,
    },
  });

  const { updateCategory, isPending } = useUpdateCategory();

  useEffect(() => {
    if (!category) return;

    form.reset({
      name: category.name,
      description: category.description ?? "",
      is_active: category.is_active ?? true,
    });
  }, [category, form]);

  const onSubmit = (data: CategoryFormValues) => {
    if (!category) return;

    updateCategory(
      {
        id: category.id,
        values: data,
      },
      {
        onSuccess: () => {
          toast.success("Category updated successfully");
          form.reset();
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(
            error.message || "Failed to update category."
          );
        },
      }
    );
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>

          <DialogDescription>
            Update the category information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            onSubmit,
            (errors) => {
              console.log("Validation errors:", errors);
            }
          )}
          className="space-y-5"
        >
          <CategoryForm form={form} />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

