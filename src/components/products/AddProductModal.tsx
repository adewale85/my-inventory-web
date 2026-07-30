"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ProductFormValues, productSchema } from "@/schemas/productSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddProductModal({
  open,
  onOpenChange,
}: AddProductModalProps) {
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

  const onSubmit = (data: ProductFormValues) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>

          <DialogDescription>
            Enter the details for the new product.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>

            <Input
              id="name"
              placeholder="e.g. Rice"
              {...form.register("name")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU</Label>

              <Input
                id="sku"
                placeholder="e.g. RICE-001"
                {...form.register("sku")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>

              <Input
                id="description"
                placeholder="Enter product description"
                {...form.register("description")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Cost Price</Label>

              <Input
                id="price"
                type="number"
                {...form.register("cost_price")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="stock">Reorder Level</Label>

              <Input
                id="stock"
                type="number"
                {...form.register("reorder_level")}
              />
            </div>
          </div>



          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>

            <Input
              id="category"
              placeholder="Category ID"
              {...form.register("category_id")}
            />
          </div>



          <div className="grid gap-2">
            <Label htmlFor="uom">Unit of Measure</Label>

            <Input
              id="uom"
              placeholder="Unit ID"
              {...form.register("unit_of_measure_id")}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="active"
              type="checkbox"
              {...form.register("is_active")}
            />

            <Label htmlFor="active">Active Product</Label>
          </div>

          <DialogFooter>
            <Button type="submit">Save Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
