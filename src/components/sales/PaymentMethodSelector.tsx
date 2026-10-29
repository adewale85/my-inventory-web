"use client";

import React from "react";
import { Banknote, Building2 } from "lucide-react";
import { PaymentMethod } from "@/types/sales";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onChangeMethod: (method: PaymentMethod) => void;
  disabled?: boolean;
}

export default function PaymentMethodSelector({
  selectedMethod,
  onChangeMethod,
  disabled = false,
}: PaymentMethodSelectorProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
        Payment Method
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChangeMethod("Cash")}
          disabled={disabled}
          className={`flex items-center justify-center gap-2 rounded-lg border p-2 text-xs font-semibold transition ${
            selectedMethod === "Cash"
              ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
              : "border-border bg-background text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <Banknote className="size-4" />
          <span>Cash</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeMethod("Bank Transfer")}
          disabled={disabled}
          className={`flex items-center justify-center gap-2 rounded-lg border p-2 text-xs font-semibold transition ${
            selectedMethod === "Bank Transfer"
              ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
              : "border-border bg-background text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <Building2 className="size-4" />
          <span>Bank Transfer</span>
        </button>
      </div>
    </div>
  );
}

