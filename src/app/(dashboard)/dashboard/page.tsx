import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import InventoryByCategory from "@/components/dashboard/InventoryByCategory";
import RecentMovements from "@/components/dashboard/RecentStockMovements";
import TopCategories from "@/components/dashboard/TopCategories";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <DashboardHeader />

      <DashboardStats />

      {/* Main Dashboard */}
      <div className="grid gap-6 lg:grid-cols-3">
         <div className="lg:col-span-2">
       
        <RecentMovements />
        </div> 

        {/* LowStockTable will come here */}
          <TopCategories/>
        {/* <div className="rounded-2xl border bg-white p-6 shadow-sm">
          
        </div> */}
      </div>
        <InventoryByCategory />

     
      

      

      {/* Latest Products Table will come here later */}
    </div>
  );
}