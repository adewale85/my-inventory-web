"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function InventoryOverviewChart() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Inventory Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex h-[360px] items-center justify-center rounded-xl border border-dashed">
          Chart coming soon...
        </div>
      </CardContent>
    </Card>
  );
}