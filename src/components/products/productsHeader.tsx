"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductsHeaderProps {
    onAddProduct: () => void
}

export default function ProductsHeader({
    onAddProduct,
}: ProductsHeaderProps) {
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Products
        </h1>

        <p className="text-muted-foreground">
          Manage all inventory products.
        </p>
      </div>

      <Button onClick={onAddProduct}>
      <Plus className="mr-2 h-4 w-4" />
      Add Product
    </Button>

    {/* <AddProductModal open={isOpen} onOpenChange={setIsOpen} /> */}
    </div>
  );
}