"use client";

import React from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentMethod } from "@/types/sales";
import { formatNaira } from "@/lib/utils";

interface ConfirmSaleButtonProps {
  total: number;
  paymentMethod: PaymentMethod;
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export default function ConfirmSaleButton({
  total,
  paymentMethod,
  disabled,
  isLoading,
  onClick,
}: ConfirmSaleButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full h-10 gap-2 font-semibold text-sm shadow-xs"
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Processing Sale with Database...</span>
        </>
      ) : (
        <>
          <CheckCircle2 className="size-4" />
          <span>
            Confirm Sale • {formatNaira(total)} ({paymentMethod})
          </span>
        </>
      )}
    </Button>
  );
}

