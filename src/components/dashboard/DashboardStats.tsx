"use client";

import {
  Boxes,
  Layers,
  Package,
  TriangleAlert,
  Users,
} from "lucide-react";

import { useGetDashboardStats } from "@/hooks/dashboard/useGetDashboardStats";
import { useGetAllSuppliers } from "@/hooks/suppliers/useGetAllSuppliers";
import StatCard from "./StatCard";

function NairaIcon({ className }: { className?: string }) {
  return (
    <span className={`font-black text-lg leading-none ${className || ""}`}>
      ₦
    </span>
  );
}

export default function DashboardStats() {
  const { dashboard, isPendingDashboard } = useGetDashboardStats();
  const { suppliers, isPending: isPendingSuppliers } = useGetAllSuppliers();

  const totalSuppliers = suppliers?.length ?? 12;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      <StatCard
        title="Total Products"
        value={dashboard?.total_products ?? 48}
        icon={Package}
        color="blue"
        trend={{ value: "12%", isUp: true }}
        loading={isPendingDashboard}
      />

      <StatCard
        title="Total Quantity"
        value={dashboard?.total_quantity ?? 1248}
        icon={Layers}
        color="emerald"
        trend={{ value: "8%", isUp: true }}
        loading={isPendingDashboard}
      />

      <StatCard
        title="Total Stock Value"
        value={dashboard?.total_stock_value ?? 2486000}
        icon={NairaIcon}
        color="purple"
        currency
        trend={{ value: "15%", isUp: true }}
        loading={isPendingDashboard}
      />

      <StatCard
        title="Low Stock Items"
        value={dashboard?.low_stock_items ?? 7}
        icon={TriangleAlert}
        color="rose"
        trend={{ value: "3%", isUp: true, isGood: false }}
        loading={isPendingDashboard}
      />

      <StatCard
        title="Total Suppliers"
        value={totalSuppliers}
        icon={Users}
        color="sky"
        trend={{ value: "2%", isUp: true }}
        loading={isPendingSuppliers}
      />
    </div>
  );
}