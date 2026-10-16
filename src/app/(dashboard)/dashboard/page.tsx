"use client";

import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import StockMovementChart from "@/components/dashboard/StockMovementChart";
import InventoryStatusChart from "@/components/dashboard/InventoryStatusChart";
import LowStockAlerts from "@/components/dashboard/LowStockAlerts";
import RecentMovementsList from "@/components/dashboard/RecentMovementsList";
import StockPromoBanner from "@/components/dashboard/StockPromoBanner";

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* 1. Header with greeting and subtitle */}
      <DashboardHeader />

      {/* 2. Top KPI Cards (5 metrics: Total Products, Total Quantity, Total Stock Value, Low Stock Items, Total Suppliers) */}
      <DashboardStats />

      {/* 3. Main Dashboard Body: 2 Columns (8 cols / 4 cols on large screens) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left Section (8 cols) */}
        <div className="space-y-6 lg:col-span-8">
          {/* Charts Row: Stock Movement Area Chart + Inventory Status Donut Chart */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-stretch">
            <div className="md:col-span-7">
              <StockMovementChart />
            </div>
            <div className="md:col-span-5">
              <InventoryStatusChart />
            </div>
          </div>

          {/* Low Stock Alerts Table */}
          <LowStockAlerts />
        </div>

        {/* Right Section (4 cols) */}
        <div className="space-y-6 lg:col-span-4 flex flex-col justify-between">
          {/* Recent Stock Movement Activities List */}
          <RecentMovementsList />

          {/* Quick Action / Stock Banner */}
          <StockPromoBanner />
        </div>
      </div>
    </div>
  );
}
