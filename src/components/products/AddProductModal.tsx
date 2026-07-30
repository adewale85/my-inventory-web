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

import { ProductFormValues, productSchema } from "@/schemas/productSchema";

import { zodResolver } from "@hookform/resolvers/zod";


import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import { toast } from "sonner";
import ProductForm from "./ProductForm";
import { useForm } from "react-hook-form";

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
   <ProductForm form={form}/>

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
