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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import { toast } from "sonner";

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

 const {createProduct, isPending} = useCreateProduct ();
   
const onSubmit = (data: ProductFormValues) => {
    // console.log(data); 
    createProduct (data, {
      onSuccess: () => {
        toast.success("Product created succesfully")

        form.reset();

        onOpenChange(false)
      },

      onError: (error) => {
        toast.error (error.message || "failed to create product.")
      }
    })
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
  className="space-y-5"
>
  {/* Product Name */}
  <div className="grid gap-2">
    <Label htmlFor="name">Product Name</Label>

    <Input
      id="name"
      placeholder="e.g. Rice"
      {...form.register("name")}
    />
  </div>

  {/* SKU */}
  <div className="grid gap-2">
    <Label htmlFor="sku">SKU</Label>

    <Input
      id="sku"
      placeholder="e.g. RICE-001"
      {...form.register("sku")}
    />
  </div>

  {/* Description */}
  <div className="grid gap-2">
    <Label htmlFor="description">Description</Label>

    <Input
      id="description"
      placeholder="Enter product description"
      {...form.register("description")}
    />
  </div>

  {/* Category + Unit */}
  <div className="grid grid-cols-2 gap-4">
    <div className="grid gap-2">
      <Label>Category</Label>

      <Controller
        control={form.control}
        name="category_id"
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="food">
                Food
              </SelectItem>

              <SelectItem value="drinks">
                Drinks
              </SelectItem>

              <SelectItem value="electronics">
                Electronics
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </div>

    <div className="grid gap-2">
      <Label>Unit of Measure</Label>

      <Controller
        control={form.control}
        name="unit_of_measure_id"
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="kg">
                Kilogram (kg)
              </SelectItem>

              <SelectItem value="g">
                Gram (g)
              </SelectItem>

              <SelectItem value="ltr">
                Liter (L)
              </SelectItem>

              <SelectItem value="pcs">
                Pieces
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  </div>

  {/* Cost Price + Reorder Level */}
  <div className="grid grid-cols-2 gap-4">
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

  {/* Status */}
  <div className="flex items-center gap-3">
    <input
      id="active"
      type="checkbox"
      {...form.register("is_active")}
    />

    <Label htmlFor="active">
      Active Product
    </Label>
  </div>

  <DialogFooter>
    <Button type="submit"
    disabled={isPending}
    >
      {isPending ? "saving..." : "Save Product"}
    </Button>
  </DialogFooter>
</form>
      </DialogContent>
    </Dialog>
  );
}
