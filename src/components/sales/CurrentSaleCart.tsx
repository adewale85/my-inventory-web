"use client";

import React from "react";
import { ShoppingCart, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/sales";
import CartItemRow from "./CartItemRow";

interface CurrentSaleCartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  disabled?: boolean;
  lastSaleId?: string | null;
  onDismissLastSale?: () => void;
}

export default function CurrentSaleCart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  disabled = false,
  lastSaleId = null,
  onDismissLastSale,
}: CurrentSaleCartProps) {
  return (
    <div className="flex flex-col">
      {/* Cart Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShoppingCart className="size-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Current Sale Cart
            </h3>
            <p className="text-xs text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} selected
            </p>
          </div>
        </div>

        {cartItems.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearCart}
            disabled={disabled}
            className="text-xs text-destructive hover:bg-destructive/10 hover:text-destructive h-8 gap-1"
          >
            <RotateCcw className="size-3.5" />
            <span>Clear Cart</span>
          </Button>
        )}
      </div>

      {/* Success Notification Banner for recent sale */}
      {lastSaleId && (
        <div className="my-3 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-50/80 p-3 text-xs text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              Sale recorded successfully! Reference ID:{" "}
              <strong className="font-mono">#{lastSaleId.slice(0, 8)}</strong>
            </span>
          </div>
          {onDismissLastSale && (
            <button
              type="button"
              onClick={onDismissLastSale}
              className="text-xs underline hover:text-emerald-950 dark:hover:text-emerald-100"
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      {/* Cart Items List or Empty State */}
      <div className="my-3 flex-1 overflow-y-auto max-h-[300px]">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <ShoppingCart className="size-10 stroke-[1.5] text-muted-foreground/40 mb-2" />
            <p className="text-sm font-medium text-foreground">
              Cart is empty
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Search and add products from the left panel to begin.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {cartItems.map((item) => (
              <CartItemRow
                key={item.productId}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
                disabled={disabled}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

