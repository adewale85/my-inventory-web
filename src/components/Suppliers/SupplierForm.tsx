"use client"

import {UseFormReturn} from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { SupplierFormValues } from "@/schemas/supplierSchema"

    interface SupplierFormProps {
    form: UseFormReturn<SupplierFormValues>
}


export default function SupplierForm ({
    form,
}: SupplierFormProps) {


    return (
      <div>       
    {/* Supplier Name */}
  <div className="grid gap-2">
    <Label htmlFor="name">Supplier Name</Label>

    <Input
      id="name"
      placeholder="e.g. Rice"
      {...form.register("name")}
    />
     
     {form.formState.errors.name && (
        <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
        </p>
     )}

     <Input 
     id="contact_person"
     placeholder="Contact Person"
     {...form.register("contact_person")}

     {...form.formState.errors.contact_person && (
      <p className="text-sm text-red-500">
        {form.formState.errors.contact_person.message}
      </p>
     )}
     />

     <Input
     id="email"
     placeholder="Email"
     {...form.register("email")}

     {...form.formState.errors.email && (
      <p className="text-sm text-red-500">
        {form.formState.errors.email.message}
      </p>
     )}
     />

      <Input
      id="phone"
      placeholder="Phone"
      {...form.register("phone")}

      {...form.formState.errors.phone && (
      <p className="text-sm text-red-500">
        {form.formState.errors.phone.message}
      </p>
     )}
      />


      <Input
      id="address"
      placeholder="Address"
      {...form.register("address")}

      {...form.formState.errors.address && (
      <p className="text-sm text-red-500">
        {form.formState.errors.address.message}
      </p>
     )}
      />

  </div>
  </div>
  
    )}