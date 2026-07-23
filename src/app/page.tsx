import { redirect } from "next/navigation";


export default function Homepage () {
  redirect ("/auth/login")
}
















// "use client";

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import AuthWrapper from "@/components/AuthWrapper";
// import MetricCard from "@/components/dashboard/StatCard";
// import MovementsList from "@/components/dashboard/MovementsList";
// import { getDashboardStats } from "@/lib/api/dashboard/getDashboardStats";
// import { getRecentStockMovements } from "@/lib/api/dashboard/getRecentStockMovements";
// import { useAuthStore } from "@/zustand/useAuthStore";


// interface Stats {
//   totalProducts: number;
//   stockValue: number;
//   lowStockItems: number;
//   totalQuantity: number;
// }

// interface Movement {
//   id: string;
//   productName: string;
//   quantity: number;
//   type: string;
//   occurredAt: string;
//   notes?: string;
//   user?: { name: string };
// }

// function DashboardContent() {
//   const user = useAuthStore((state) => state.auth);
//   const isAdmin = user?.role === "ADMIN";

//   const statsQuery = useQuery<Stats>({
//     queryKey: ["dashboard", "stats"],
//     queryFn: () => getDashboardStats(),
//     retry: false,
//   });

//   const movementsQuery = useQuery<Movement[]>({
//     queryKey: ["dashboard", "recent-stock-movements"],
//     queryFn: () => getRecentStockMovements(),
//     retry: false,
//   });

//   const loading = statsQuery.isLoading || movementsQuery.isLoading;
//   const error = statsQuery.isError || movementsQuery.isError;

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <header className="mb-6">
//         <h1 className="text-3xl font-semibold text-slate-800">Inventory Dashboard</h1>
//         <p className="text-sm text-slate-500">Overview mapped to /api/v1/dashboard/* endpoints</p>
//       </header>

//       <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <MetricCard label="Total Products" value={statsQuery.data?.totalProducts ?? 0} loading={statsQuery.isLoading} />
//         {isAdmin && <MetricCard label="Total Stock Value" value={statsQuery.data?.stockValue ?? 0} loading={statsQuery.isLoading} currency />}
//         <MetricCard label="Low Stock Items" value={statsQuery.data?.lowStockItems ?? 0} loading={statsQuery.isLoading} />
//         <MetricCard label="Total Quantity" value={statsQuery.data?.totalQuantity ?? 0} loading={statsQuery.isLoading} />
//       </section>

//       {error && (
//         <div className="mb-6 rounded-lg border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
//           Failed to load dashboard data. Please refresh the page.
//         </div>
//       )}

//       <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
//           <h2 className="text-lg font-medium text-slate-800 mb-3">Recent Stock Movements</h2>
//           <MovementsList movements={movementsQuery.data ?? []} loading={movementsQuery.isLoading} />
//         </div>

//         <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
//           <h2 className="text-lg font-medium text-slate-800 mb-3">Quick Actions</h2>
//           <div className="space-y-3">
//             <button className="w-full rounded bg-emerald-500 text-white py-2 px-3 text-sm hover:bg-emerald-600">Record Stock Movement</button>
//             <button className="w-full rounded border border-slate-200 bg-white text-slate-700 py-2 px-3 text-sm hover:bg-slate-50">Add Product</button>
//           </div>
//         </div>
//       </section>

//       <footer className="mt-8 text-xs text-slate-400">Stock Value is admin-only and will be hidden from USER roles.</footer>
//     </div>
//   );
// }

// export default function Page() {
//   return (
//     <AuthWrapper>
//       <DashboardContent />
//     </AuthWrapper>
//   );
// }
