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
import ProductForm from "./ProductForm";

import {
  ProductFormValues,
  productSchema,
} from "@/schemas/productSchema";

import { ProductResponse } from "@/types/product";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct.";

interface EditProductModalProps {
  product: ProductResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProductModal({
  product,
  open,
  onOpenChange,
}: EditProductModalProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: "",
      sku: "",
      description: "",
      category_id: "",
      unit_of_measure_id: "",
      reorder_level: 0,
      cost_price: 0,
      is_active: true,
      supplier_ids: [],
    },
  });

  const { updateProduct, isPending } = useUpdateProduct();

  useEffect(() => {
    if (!product) return;

    form.reset({
      name: product.name,
      sku: product.sku,
      description: product.description ?? "",
      category_id: product.category?.id ?? "",

      // We will fix this once we confirm how
      // your unit_of_measure data is returned.
      unit_of_measure_id: "",

      reorder_level: Number(product.reorder_level),
      cost_price: Number(product.cost_price),
      is_active: product.is_active,
      supplier_ids: [],
    });
  }, [product, form]);

  const onSubmit = (data: ProductFormValues) => {
    if (!product) return;

    updateProduct(
      {
        id: product.id,
        values: data,
      },
      {
        onSuccess: () => {
          toast.success("Product updated successfully");

          form.reset();

          onOpenChange(false);
        },

        onError: (error) => {
          toast.error(
            error.message || "Failed to update product."
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
          <DialogTitle>Edit Product</DialogTitle>

          <DialogDescription>
            Update the product information.
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
          <ProductForm form={form} />

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
              {isPending ? "Updating..." : "Update Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}