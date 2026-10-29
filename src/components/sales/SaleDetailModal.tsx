"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sale } from "@/types/sales";
import { formatNaira } from "@/lib/utils";
import { Calendar, User, Phone, Banknote, Building2, Package } from "lucide-react";

interface SaleDetailModalProps {
  sale: Sale | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SaleDetailModal({
  sale,
  open,
  onOpenChange,
}: SaleDetailModalProps) {
  if (!sale) return null;

  const formattedDate = new Date(sale.created_at).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isCash = sale.payment_method?.toLowerCase().includes("cash");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="text-lg font-bold">
              Sale Details
            </DialogTitle>
            <Badge variant="outline" className="font-mono text-xs">
              #{sale.id.slice(0, 8)}
            </Badge>
          </div>
          <DialogDescription className="text-xs">
            Complete transaction breakdown and line items.
          </DialogDescription>
        </DialogHeader>

        {/* Transaction Meta Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg border border-border bg-muted/40 p-3 text-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="size-3.5" />
              <span>Date:</span>
              <strong className="text-foreground">{formattedDate}</strong>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <User className="size-3.5" />
              <span>Customer:</span>
              <strong className="text-foreground">
                {sale.customer_name || "Walk-in Customer"}
              </strong>
            </div>

            {sale.customer_contact && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Phone className="size-3.5" />
                <span>Contact:</span>
                <strong className="text-foreground">{sale.customer_contact}</strong>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              {isCash ? (
                <Banknote className="size-3.5 text-emerald-600" />
              ) : (
                <Building2 className="size-3.5 text-blue-600" />
              )}
              <span>Payment:</span>
              <Badge
                variant={isCash ? "default" : "secondary"}
                className="h-4.5 px-2 text-[10px]"
              >
                {sale.payment_method}
              </Badge>
            </div>

            {sale.cashier_name && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <User className="size-3.5" />
                <span>Cashier:</span>
                <strong className="text-foreground">{sale.cashier_name}</strong>
              </div>
            )}

            <div className="text-[11px] font-mono text-muted-foreground truncate">
              ID: {sale.id}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-2 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Items Purchased
          </h4>

          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground">
                <tr>
                  <th className="py-2 px-3 font-semibold">Product</th>
                  <th className="py-2 px-3 font-semibold text-center">Qty</th>
                  <th className="py-2 px-3 font-semibold text-right">Unit Price</th>
                  <th className="py-2 px-3 font-semibold text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(!sale.sale_items || sale.sale_items.length === 0) ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-4 text-center text-muted-foreground text-xs"
                    >
                      No items recorded for this sale.
                    </td>
                  </tr>
                ) : (
                  sale.sale_items.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <Package className="size-3.5 text-muted-foreground shrink-0" />
                          <div>
                            <span className="font-medium text-foreground block">
                              {item.products?.name || "Inventory Product"}
                            </span>
                            {item.products?.sku && (
                              <span className="text-[10px] font-mono text-muted-foreground">
                                SKU: {item.products.sku}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-medium">
                        {item.quantity}
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium">
                        {formatNaira(item.unit_price)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-foreground">
                        {formatNaira(item.subtotal)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grand Total */}
        <div className="flex items-center justify-between rounded-lg bg-muted/60 p-3 text-sm">
          <span className="font-semibold text-foreground">Total Paid:</span>
          <span className="text-lg font-bold text-primary">
            {formatNaira(sale.total_amount)}
          </span>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

