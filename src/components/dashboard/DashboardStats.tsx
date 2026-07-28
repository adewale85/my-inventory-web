"use client";

import {
  Boxes,
  Package,
  TriangleAlert,
  Wallet,
} from "lucide-react";

import { useGetDashboardStats } from "@/hooks/dashboard/useGetDashboardStats";
import StatCard from "./StatCard";

export default function DashboardStats() {
  const { dashboard, isPendingDashboard } = useGetDashboardStats();

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Products"
        value={dashboard?.total_products ?? 0}
        description="Products available"
        icon={Package}
        color="blue"
        loading={isPendingDashboard}
      />

      <StatCard
        title="Stock Value"
        value={dashboard?.total_stock_value ?? 0}
        description="Current inventory worth"
        icon={Wallet}
        color="green"
        currency
        loading={isPendingDashboard}
      />

      <StatCard
        title="Low Stock Items"
        value={dashboard?.low_stock_items ?? 0}
        description="Require attention"
        icon={TriangleAlert}
        color="orange"
        loading={isPendingDashboard}
      />

      <StatCard
        title="Total Quantity"
        value={dashboard?.total_quantity ?? 0}
        description="Units in stock"
        icon={Boxes}
        color="purple"
        loading={isPendingDashboard}
      />
    </div>
  );
}