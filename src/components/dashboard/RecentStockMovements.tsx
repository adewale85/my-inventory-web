"use client";

import { useMemo } from "react";
import { TrendingUp } from "lucide-react";

import { useGetRecentStockMovements } from "@/hooks/dashboard/useGetRecentStockMovements";
import RecentStockMovementChart from "../charts/RecentStockMovementChart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function RecentStockMovement() {
  const {
    recentStockMovements,
    isPendingRecentStockMovements,
  } = useGetRecentStockMovements();

  const chartData = useMemo(() => {
    if (!recentStockMovements) return [];

    return [...recentStockMovements]
      .sort(
        (a, b) =>
          new Date(a.occurred_at).getTime() -
          new Date(b.occurred_at).getTime()
      )
      .map((movement) => ({
        date: new Date(movement.occurred_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        quantity: Number(movement.quantity),
      }));
  }, [recentStockMovements]);

  return (
    <Card className="rounded-2xl border border-slate-200 bg-blue-100 shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-xl font-semibold">
            Recent Stock Movement
          </CardTitle>

          <CardDescription className="mt-1">
            Track inventory activity over time
          </CardDescription>

          <div className="mt-5">
            <h2 className="text-4xl font-bold">
              {recentStockMovements?.length ?? 0}
            </h2>

            <p className="text-sm text-muted-foreground">
              Total Movements
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Last 30 Days
          </span>

          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            +12%
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <RecentStockMovementChart
          loading={isPendingRecentStockMovements}
          data={chartData}
        />
      </CardContent>
    </Card>
  );
}