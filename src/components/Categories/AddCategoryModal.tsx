"use client";

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

import { Button } from "../ui/button";

import {
  CategoryFormValues,
  categorySchema,
} from "@/schemas/categoriesSchema";

import CategoryForm from "./CategoryForm";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddCategoryModal({
  open,
  onOpenChange,
}: AddCategoryModalProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      is_active: true,
    },
  });

const { createCategory, isPending } = useCreateCategory();

 const onSubmit = (data: CategoryFormValues) => {
  createCategory(data, {
    onSuccess: () => {
      toast.success("Category created successfully");

      form.reset();
      onOpenChange(false);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>

          <DialogDescription>
            Create a new product category.
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
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
  {isPending ? "Creating..." : "Create Category"}
</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}