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


import { zodResolver } from "@hookform/resolvers/zod";



import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { SupplierFormValues, supplierSchema } from "@/schemas/supplierSchema";
import SupplierForm from "./SupplierForm";
import { useCreatSupplier } from "@/hooks/suppliers/useCreateSupplier";

interface AddSupplierModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function AddSupplierModal({
  open,
  onOpenChange,
}: AddSupplierModalProps) {
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      contact_person: "",
      email: "",
      phone: "",
      address: "",
      

    },
  });

 const {createSupplier, isPending} = useCreatSupplier();
   
const onSubmit = (data: SupplierFormValues) => {
    // console.log(data); 
    createSupplier (data, {
      onSuccess: () => {
        toast.success("Supplier created succesfully")

        form.reset();

        onOpenChange(false)
      },

      onError: (error) => {
        toast.error (error.message || "failed to create supplier.")
      }
    })
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>

          <DialogDescription>
            Enter the details for the new supplier.
          </DialogDescription>
        </DialogHeader>

      

  <form
       onSubmit={form.handleSubmit(onSubmit)}
       className="space-y-5"
       >
   <SupplierForm form={form}/>

  <DialogFooter>
    <Button type="submit"
    disabled={isPending}
    >
      {isPending ? "saving..." : "Save Supplier"}
    </Button> 
  </DialogFooter> 
</form> 
      </DialogContent>
    </Dialog>
  );
}
