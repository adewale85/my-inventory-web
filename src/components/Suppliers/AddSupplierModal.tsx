"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  
} from "@/components/ui/dialog";

import { Button } from "../ui/button";


import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { SupplierFormValues, supplierSchema } from "@/schemas/supplierSchema";
import SupplierForm from "./SupplierForm";
import { useCreateSupplier } from "@/hooks/suppliers/useCreateSupplier";


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

 const {createSupplier, isPending} = useCreateSupplier();
   
const onSubmit = (data: SupplierFormValues) => {
  createSupplier(data, {
    onSuccess: () => {
      toast.success("Supplier created successfully");
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create supplier.");
    },
  });
};

// 1. Add this error handler to catch validation issues
const onInvalid = (errors: any) => {
  console.log("Validation Failed:", errors);
  toast.error("Please check the form for errors.");
};

return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[425px]">
      {/* ... header ... */}
      
      {/* 2. Pass 'onInvalid' as the second argument to handleSubmit */}
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-5">
        <SupplierForm form={form}/>

        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Supplier"}
          </Button> 
        </DialogFooter> 
      </form> 
    </DialogContent>
  </Dialog>
);
}
 