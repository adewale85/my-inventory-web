
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import InventoryBtCategory from "@/components/dashboard/InventoryByCategory";
import RecentMovements from "@/components/dashboard/RecentMovements";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <DashboardHeader />
      <DashboardStats />
      <RecentMovements/>
      <InventoryBtCategory/>
    </div>
  );
}