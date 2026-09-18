
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import InventoryByCategory from "@/components/dashboard/InventoryByCategory";
import RecentMovements from "@/components/dashboard/RecentStockMovements";
import TopCategories from "@/components/dashboard/TopCategories";

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Statistics */}
      <DashboardStats />

      {/* Main Dashboard */}
      <div className="grid w-full gap-6 lg:grid-cols-3">
        {/* Recent Stock Movements */}
        <div className="min-w-0 lg:col-span-2">
          <RecentMovements />
        </div>

        {/* Top Categories */}
        <div className="min-w-0">
          <TopCategories />
        </div>
      </div>

      {/* Inventory By Category */}
      <div className="w-full min-w-0">
        <InventoryByCategory />
      </div>
    </div>
  );
}

