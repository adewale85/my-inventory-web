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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  SupplierResponse,
  SupplierResponsePayload,
} from "@/types/suppliers";

import { useUpdateSupplier } from "@/hooks/suppliers/useUpdateSupplier";

import { z } from "zod";

const supplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  contact_person: z.string().min(1, "Contact person is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  is_active: z.boolean(),
});

interface EditSupplierModalProps {
  supplier: SupplierResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditSupplierModal({
  supplier,
  open,
  onOpenChange,
}: EditSupplierModalProps) {
  const form = useForm<SupplierResponsePayload>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      contact_person: "",
      email: "",
      phone: "",
      address: "",
      is_active: true,
    },
  });

  const { updateSupplier, isPending } = useUpdateSupplier();

  useEffect(() => {
    if (!supplier) return;

    form.reset({
      name: supplier.name,
      contact_person: supplier.contact_person ?? "",
      email: supplier.email ?? "",
      phone: supplier.phone ?? "",
      address: supplier.address ?? "",
      is_active: supplier.is_active,
    });
  }, [supplier, form]);

  const onSubmit = (data: SupplierResponsePayload) => {
    if (!supplier) return;

    updateSupplier(
      {
        id: supplier.id,
        payload: data,
      },
      {
        onSuccess: () => {
          toast.success("Supplier updated successfully");
          form.reset();
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update supplier");
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Supplier</DialogTitle>
          <DialogDescription>
            Update the supplier information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Supplier Name</Label>
            <Input
              id="name"
              placeholder="Enter supplier name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact_person">Contact Person</Label>
            <Input
              id="contact_person"
              placeholder="Enter contact person"
              {...form.register("contact_person")}
            />
            {form.formState.errors.contact_person && (
              <p className="text-sm text-red-500">
                {form.formState.errors.contact_person.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              {...form.register("phone")}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter address"
              {...form.register("address")}
            />
            {form.formState.errors.address && (
              <p className="text-sm text-red-500">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              id="is_active"
              type="checkbox"
              {...form.register("is_active")}
            />
            <Label htmlFor="is_active">Active Supplier</Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Supplier"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}