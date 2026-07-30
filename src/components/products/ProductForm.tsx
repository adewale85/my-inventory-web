"use client"

import { Controller, UseFormReturn} from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ProductFormValues } from "@/schemas/productSchema"


interface ProductFormProps {
    form: UseFormReturn<ProductFormValues>
}

export default function ProductForm ({
    form,
}: ProductFormProps) {
    return (
        <> 
        
    {/* Product Name */}
  <div className="grid gap-2">
    <Label htmlFor="name">Product Name</Label>

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

  </div>
  
  {/* SKU */}
  <div className="grid gap-2">
    <Label htmlFor="sku">SKU</Label>

    <Input
      id="sku"
      placeholder="e.g. RICE-001"
      {...form.register("sku")}
    />

    {form.formState.errors.sku && (
      <p className="text-sm text-red-500">
        {form.formState.errors.sku.message}
      </p>
    )}
  </div>

  {/* Description */}
  <div className="grid gap-2">
    <Label htmlFor="description">Description</Label>

    <Input
      id="description"
      placeholder="Enter product description"
      {...form.register("description")}
    />

     {form.formState.errors.description && (
      <p className="text-sm text-red-500">
        {form.formState.errors.description.message}
      </p>
    )}
   
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

      {form.formState.errors.category_id && (
        <p className="text-sm text-red-500" >
          {form.formState.errors.category_id.message}
        </p>
      )}
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

      {form.formState.errors.unit_of_measure_id && (
        <p className="text-sm text-red-500">
          {form.formState.errors.unit_of_measure_id.message}
        </p>
      )}
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

      {form.formState.errors.cost_price && (
        <p className="text-sm text-red-500">
          {form.formState.errors.cost_price.message}
        </p>
      )}
    </div>

    <div className="grid gap-2">
      <Label htmlFor="stock">Reorder Level</Label>

      <Input
        id="stock"
        type="number"
        {...form.register("reorder_level")}
       /> 

      {form.formState.errors.reorder_level && (
        <p className="text-sm text-red-500">
          {form.formState.errors.reorder_level.message}
        </p>
      )}
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
        </div>
        </>
    )
}