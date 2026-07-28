"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function ProductsHeader() {
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

      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  );
}