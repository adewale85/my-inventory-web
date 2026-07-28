"use client";

import { useGetInventoryByCategory } from "@/hooks/dashboard/useGetInventoryByCategory";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function InventoryByCategory() {
  const { inventory, isPendingDashboard } =
    useGetInventoryByCategory();

  if (isPendingDashboard) {
    return (
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Inventory Breakdown by Category</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-12 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!inventory?.length) {
    return (
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Inventory Breakdown by Category</CardTitle>
        </CardHeader>

        <CardContent>
          No inventory found.
        </CardContent>
      </Card>
    );
  }

  const totalQuantity = inventory.reduce(
    (sum, item) => sum + item.total_quantity,
    0
  );

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>
          Inventory Breakdown by Category
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {inventory.map((item) => {
          const percentage =
            totalQuantity === 0
              ? 0
              : (item.total_quantity / totalQuantity) * 100;

          return (
            <div key={item.name}>
              {/* top row */}
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold">
                  {item.name}
                </h4>

                <span className="text-sm text-muted-foreground">
                  {item.total_quantity.toLocaleString()} Units
                </span>
              </div>

              {/* progress */}
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              {/* bottom row */}
              <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {percentage.toFixed(1)}% of inventory
                </span>

                <span>
                  {item.total_value.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}