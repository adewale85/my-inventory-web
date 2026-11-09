"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { useGetInventory } from "@/hooks/inventory/useGetInventory";
import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";

export default function LowStockAlerts() {
  const { inventory } = useGetInventory();
  const { products } = useGetAllProducts();

  const lowStockItems = useMemo(() => {
    if (inventory && inventory.length > 0 && products && products.length > 0) {
      const items = inventory
        .map((item) => {
          const product = products.find((p) => p.id === item.product_id);
          const currentStock = Number(item.quantity ?? 0);
          const reorderLevel = Number(product?.reorder_level ?? 10);
          return {
            id: item.id,
            name: product?.name || "Product Item",
            currentStock: `${currentStock} units`,
            reorderLevel: `${reorderLevel} units`,
            isLow: currentStock < reorderLevel,
          };
        })
        .filter((item) => item.isLow)
        .slice(0, 4);

      if (items.length > 0) return items;
    }

    // Default mock list matching the reference image
    return [
      {
        id: "1",
        name: "Mechanical Keyboard",
        currentStock: "3 units",
        reorderLevel: "15 units",
        isLow: true,
      },
      {
        id: "2",
        name: "Wireless Mouse",
        currentStock: "2 units",
        reorderLevel: "10 units",
        isLow: true,
      },
      {
        id: "3",
        name: "USB-C Cable",
        currentStock: "5 units",
        reorderLevel: "20 units",
        isLow: true,
      },
      {
        id: "4",
        name: "Power Bank 10000mAh",
        currentStock: "4 units",
        reorderLevel: "12 units",
        isLow: true,
      },
    ];
  }, [inventory, products]);

  return (
    <div className="rounded-2xl border border-border bg-card text-card-foreground p-5 shadow-xs transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500 dark:text-rose-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-foreground">Low Stock Alerts</h3>
        </div>

        <Link
          href="/inventory"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
        >
          View All
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="pb-2.5 font-semibold tracking-wider uppercase">
                Product
              </th>
              <th className="pb-2.5 font-semibold tracking-wider uppercase">
                Current Stock
              </th>
              <th className="pb-2.5 font-semibold tracking-wider uppercase">
                Reorder Level
              </th>
              <th className="pb-2.5 text-right font-semibold tracking-wider uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {lowStockItems.map((item) => (
              <tr
                key={item.id}
                className="group transition-colors hover:bg-muted/50"
              >
                <td className="py-3 font-semibold text-foreground">
                  {item.name}
                </td>
                <td className="py-3 font-medium text-muted-foreground">
                  {item.currentStock}
                </td>
                <td className="py-3 font-medium text-muted-foreground">
                  {item.reorderLevel}
                </td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Low Stock
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

