"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownLeft, ArrowRight } from "lucide-react";
import { useGetAllStockMovements } from "@/hooks/stock-movements/useGetAllStockMovement";
import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSec < 60) return "Just now";
    if (diffInSec < 3600) return `${Math.floor(diffInSec / 60)} mins ago`;
    if (diffInSec < 86400) {
      const hours = Math.floor(diffInSec / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    if (diffInSec < 172800) return "Yesterday";
    const days = Math.floor(diffInSec / 86400);
    return `${days} days ago`;
  } catch {
    return "Recent";
  }
}

export default function RecentMovementsList() {
  const { stockMovements } = useGetAllStockMovements();
  const { products } = useGetAllProducts();

  const movements = useMemo(() => {
    if (stockMovements && stockMovements.length > 0) {
      return stockMovements.slice(0, 5).map((m) => {
        const product = products.find((p) => p.id === m.product_id);
        return {
          id: m.id,
          name: product?.name || "Inventory Product",
          time: formatRelativeTime(m.created_at),
          type: m.type,
          qty: Number(m.quantity),
        };
      });
    }

    // Default mock list matching the reference image
    return [
      { id: "1", name: "Wireless Mouse", time: "2 hours ago", type: "IN" as const, qty: 50 },
      { id: "2", name: "Mechanical Keyboard", time: "4 hours ago", type: "OUT" as const, qty: 12 },
      { id: "3", name: "USB-C Hub Multiport", time: "Yesterday", type: "IN" as const, qty: 30 },
      { id: "4", name: "Gaming Monitor 27\"", time: "Yesterday", type: "OUT" as const, qty: 5 },
      { id: "5", name: "Bluetooth Headphones", time: "2 days ago", type: "IN" as const, qty: 25 },
    ];
  }, [stockMovements, products]);

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-100/90 bg-white p-5 shadow-xs transition hover:shadow-md">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-slate-900">
          Recent Stock Movement
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Latest inventory activities
        </p>
      </div>

      {/* List */}
      <div className="my-3 divide-y divide-slate-100">
        {movements.map((item) => {
          const isIn = item.type === "IN";
          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-2.5 first:pt-1 last:pb-1"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                    isIn
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-500"
                  }`}
                >
                  {isIn ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-800">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {item.time}
                  </p>
                </div>
              </div>

              <div
                className={`shrink-0 text-xs font-bold ${
                  isIn ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {isIn ? `+${item.qty}` : `-${item.qty}`} Qty
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="border-t border-slate-100 pt-3">
        <Link
          href="/stock-movement"
          className="group flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          <span>View All Movements</span>
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

