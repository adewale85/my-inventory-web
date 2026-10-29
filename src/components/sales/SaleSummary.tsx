"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { formatNaira } from "@/lib/utils";

interface SaleSummaryProps {
  subtotal: number;
  total: number;
  validationErrors?: string[];
  hasItems?: boolean;
}

export default function SaleSummary({
  subtotal,
  total,
  validationErrors = [],
  hasItems = false,
}: SaleSummaryProps) {
  return (
    <div className="space-y-3">
      {/* Subtotal & Total Display */}
      <div className="rounded-lg bg-muted/40 p-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">
            {formatNaira(subtotal)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm font-bold text-foreground">
          <span>Total Amount</span>
          <span className="text-base text-primary font-bold">
            {formatNaira(total)}
          </span>
        </div>
      </div>

      {/* Validation Warnings */}
      {validationErrors.length > 0 && hasItems && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-2.5 text-xs text-destructive">
          <div className="flex items-start gap-1.5">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Cannot complete sale:</p>
              <ul className="mt-0.5 list-disc pl-4 space-y-0.5">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

