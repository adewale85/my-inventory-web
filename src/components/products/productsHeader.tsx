
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductsHeaderProps {
  onAddProduct: () => void;
}

export default function ProductsHeader({
  onAddProduct,
}: ProductsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Products
        </h1>

        <p className="text-sm text-muted-foreground sm:text-base">
          Manage all inventory products.
        </p>
      </div>

      <Button onClick={onAddProduct} className="w-full sm:w-auto">
        <Plus className="mr-2 size-4" />
        Add Product
      </Button>
    </div>
  );
}

