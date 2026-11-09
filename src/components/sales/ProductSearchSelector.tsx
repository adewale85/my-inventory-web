"use client";

import React, { useState, useMemo } from "react";
import { Search, Plus, X, PackageCheck, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";
import { useGetInventory } from "@/hooks/inventory/useGetInventory";
import { formatNaira } from "@/lib/utils";
import { CartItem } from "@/types/sales";

interface ProductSearchSelectorProps {
  onAddToCart: (item: CartItem) => void;
  cartItems: CartItem[];
}

export default function ProductSearchSelector({
  onAddToCart,
  cartItems,
}: ProductSearchSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, isPending: productsLoading } = useGetAllProducts();
  const { inventory, isPending: inventoryLoading } = useGetInventory();

  // Combine products with their current inventory stock & price
  const productOptions = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    return products
      .filter((p) => p.is_active !== false) // Only active products
      .map((p) => {
        const inv = inventory?.find((i) => i.product_id === p.id);
        const availableStock = Number(inv?.quantity ?? 0);
        const sellingPrice = Number(p.selling_price ?? 0);

        return {
          id: p.id,
          name: p.name,
          sku: p.sku || "N/A",
          sellingPrice,
          availableStock,
        };
      });
  }, [products, inventory]);

  // Filter based on search term
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return productOptions.slice(0, 8); // Show first 8 by default

    return productOptions.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term)
    );
  }, [productOptions, searchTerm]);

  const handleSelect = (product: {
    id: string;
    name: string;
    sku: string;
    sellingPrice: number;
    availableStock: number;
  }) => {
    if (product.availableStock <= 0) return;
    if (product.sellingPrice <= 0) return;

    onAddToCart({
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      sellingPrice: product.sellingPrice,
      availableStock: product.availableStock,
      quantity: 1,
    });
  };

  const isLoading = productsLoading || inventoryLoading;

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-xs">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-foreground">
          Select Products
        </h3>
        <p className="text-xs text-muted-foreground">
          Search inventory by product name or SKU to add to cart
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-8 h-9 text-sm rounded-lg"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2 pr-1">
        {isLoading ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Loading inventory products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            {searchTerm
              ? `No active products found matching "${searchTerm}".`
              : "No active products available."}
          </div>
        ) : (
          filteredProducts.map((product) => {
            const inCart = cartItems.find((c) => c.productId === product.id);
            const cartQuantity = inCart?.quantity ?? 0;
            const remainingStock = product.availableStock - cartQuantity;
            const isOutOfStock = product.availableStock <= 0;
            const isNoPrice = product.sellingPrice <= 0;
            const isFullyInCart = remainingStock <= 0 && !isOutOfStock;

            return (
              <div
                key={product.id}
                className="group flex items-center justify-between gap-3 rounded-lg border border-border/80 bg-background/50 p-2.5 transition-colors hover:border-primary/40 hover:bg-muted/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {product.name}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      ({product.sku})
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-foreground">
                      {formatNaira(product.sellingPrice)}
                    </span>

                    {isNoPrice && (
                      <Badge variant="destructive" className="h-4 px-1.5 text-[10px]">
                        No Selling Price
                      </Badge>
                    )}

                    {isOutOfStock ? (
                      <Badge variant="destructive" className="h-4 px-1.5 text-[10px]">
                        Out of Stock
                      </Badge>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">
                        Stock:{" "}
                        <strong className="text-foreground">
                          {product.availableStock}
                        </strong>
                        {cartQuantity > 0 && (
                          <span className="text-primary ml-1">
                            ({cartQuantity} in cart)
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant={inCart ? "secondary" : "default"}
                  disabled={isOutOfStock || isNoPrice || isFullyInCart}
                  onClick={() => handleSelect(product)}
                  className="h-8 gap-1 px-2.5 shrink-0"
                >
                  <Plus className="size-3.5" />
                  <span>{inCart ? "Add More" : "Add"}</span>
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

