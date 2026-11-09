"use client";

import React from "react";
import { Plus, Minus, Trash2, AlertTriangle } from "lucide-react";
import { CartItem } from "@/types/sales";
import { formatNaira } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  disabled?: boolean;
}

export default function CartItemRow({
  item,
  onUpdateQuantity,
  onRemoveItem,
  disabled = false,
}: CartItemRowProps) {
  const subtotal = item.quantity * item.sellingPrice;
  const hasStockError = item.quantity > item.availableStock;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3">
      {/* Item Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold text-foreground">
            {item.productName}
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            ({item.sku})
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatNaira(item.sellingPrice)} each</span>
          <span>•</span>
          <span>Available: {item.availableStock}</span>
        </div>
        {hasStockError && (
          <p className="text-[11px] font-medium text-destructive mt-1 flex items-center gap-1">
            <AlertTriangle className="size-3" />
            Exceeds available stock ({item.availableStock})
          </p>
        )}
      </div>

      {/* Quantity Controls & Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
        {/* Plus/Minus Controller */}
        <div className="flex items-center rounded-lg border border-border bg-background">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            disabled={item.quantity <= 1 || disabled}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <Minus className="size-3" />
          </button>
          <input
            type="number"
            min={1}
            max={item.availableStock}
            value={item.quantity}
            disabled={disabled}
            aria-label={`Quantity for ${item.productName}`}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              onUpdateQuantity(item.productId, isNaN(val) ? 1 : val);
            }}
            className="w-11 text-center text-xs font-semibold text-foreground focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            disabled={item.quantity >= item.availableStock || disabled}
            aria-label="Increase quantity"
            className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <Plus className="size-3" />
          </button>
        </div>

        {/* Subtotal */}
        <div className="w-24 text-right">
          <span className="text-sm font-bold text-foreground">
            {formatNaira(subtotal)}
          </span>
        </div>

        {/* Delete Item */}
        <button
          type="button"
          onClick={() => onRemoveItem(item.productId)}
          disabled={disabled}
          aria-label={`Remove ${item.productName} from cart`}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-40"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}

