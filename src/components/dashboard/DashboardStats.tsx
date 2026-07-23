"use client";
import { useGetDashboardStats } from "@/hooks/dashboard/useGetDashboardStats";
import StatCard from "./StatCard";

export default function DashboardStats() {
    const {dashboard, isPendingDashboard} = useGetDashboardStats();

    return(
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
            title="Total Products"
            value={dashboard?.total_products ?? 0}
            loading={isPendingDashboard}
            />

            <StatCard
            title="Stock Value"
            value={dashboard?.total_stock_value ?? 0}
            loading= {isPendingDashboard}
            currency
            />

            <StatCard
            title="Low Stock Items"
            value={dashboard?.low_stock_items ?? 0}
            loading={isPendingDashboard}
            />

            <StatCard
            title="Total Quantity"
            value={dashboard?.total_quantity ?? 0}
            loading={isPendingDashboard}
            />
        </div>
    )
}

