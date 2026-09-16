"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  stockMovementSchema,
  StockMovementFormValues,
} from "@/schemas/stockMovementSchema";

import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";
import { useProcessStockMovement } from "@/hooks/stock-movements/useProcessStockMovement";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function StockMovementForm() {
  const form = useForm<StockMovementFormValues>({
    resolver: zodResolver(stockMovementSchema),
    defaultValues: {
      product_id: "",
      type: "IN",
      quantity: 0,
      note: "",
    },
  });

  const { products, isPending: productsLoading } = useGetAllProducts();

  const {
    processStockMovement,
    isPending: movementLoading,
    error,
  } = useProcessStockMovement();

  const onSubmit = (values: StockMovementFormValues) => {
    processStockMovement(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Product */}
      <div className="space-y-2">
        <label>Product</label>

        <Select
          value={form.watch("product_id")}
          onValueChange={(value) =>
            form.setValue("product_id", value, {
              shouldValidate: true,
            })
          }
          disabled={productsLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>

          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {form.formState.errors.product_id && (
          <p className="text-sm text-red-500">
            {form.formState.errors.product_id.message}
          </p>
        )}
      </div>

      {/* Movement Type */}
      <div className="space-y-2">
        <label>Movement Type</label>

        <Select
          value={form.watch("type")}
          onValueChange={(value: "IN" | "OUT") =>
            form.setValue("type", value, {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select movement type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="IN">Stock In</SelectItem>
            <SelectItem value="OUT">Stock Out</SelectItem>
          </SelectContent>
        </Select>

        {form.formState.errors.type && (
          <p className="text-sm text-red-500">
            {form.formState.errors.type.message}
          </p>
        )}
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <label>Quantity</label>

        <Input
          type="number"
          step="0.01"
          {...form.register("quantity", {
            valueAsNumber: true,
          })}
        />

        {form.formState.errors.quantity && (
          <p className="text-sm text-red-500">
            {form.formState.errors.quantity.message}
          </p>
        )}
      </div>

      {/* Note */}
      <div className="space-y-2">
        <label>Note</label>

        <textarea
          placeholder="Optional note"
          {...form.register("note")}
        />
      </div>

      {/* API Error */}
      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}

      {/* Submit */}
      <Button type="submit" disabled={movementLoading}>
        {movementLoading ? "Processing..." : "Process Stock"}
      </Button>
    </form>
  );
}