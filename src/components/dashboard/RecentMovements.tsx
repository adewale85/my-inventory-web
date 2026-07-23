"use client";

import { useGetRecentStockMovements } from "@/hooks/dashboard/useGetRecentStockMovements";
import MovementTypeBadge from "./MovementTypeBadge";

export default function RecentMovements() {
  const { recentStockMovements, isPendingRecentStockMovements } =
    useGetRecentStockMovements();

  if (isPendingRecentStockMovements) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
        <div className="space-y-3 pt-2">
          <div className="h-12 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-12 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-12 w-full animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  if (!recentStockMovements?.length) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Recent Stock Movements
        </h2>

        <p className="text-sm text-slate-500">
          No recent stock movements found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        Recent Stock Movements
      </h2>

      <div className="divide-y divide-slate-100">
        {recentStockMovements.slice(0,5).map((movement) => (
          <div
            key={movement.id}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            {/* Left side: Product name, Badge, and User info */}
            <div className="space-y-1">
              <p className="font-semibold text-slate-900 text-sm">
                {movement.product.name}
              </p>

              <div className="flex items-center gap-2">
                <MovementTypeBadge type={movement.type} />
                <span className="text-xs text-slate-400">
                  By {movement.user.name}
                </span>
              </div>
            </div>

            {/* Right side: Quantity and Date */}
            <div className="text-right">
              <p className="font-semibold text-sm text-slate-900">
                {movement.quantity}
              </p>

              <p className="text-xs text-slate-400">
                {new Date(movement.occurred_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}