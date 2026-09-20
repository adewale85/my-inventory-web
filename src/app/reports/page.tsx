// "use client";

// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";

// interface InventorySummaryItem { category: string; quantity: number }
// interface StockValueItem { category: string; value: number }

// export default function ReportsPage() {
//   const { user } = useAuth();
//   const isAdmin = user?.role === "ADMIN";
//   const [inventorySummary, setInventorySummary] = useState<InventorySummaryItem[]>([]);
//   const [stockValue, setStockValue] = useState<StockValueItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isAdmin) return setLoading(false);
//     let mounted = true;
//     async function load() {
//       setLoading(true);
//       try {
//         const [iRes, vRes] = await Promise.all([fetch('/api/v1/reports/inventory-summary'), fetch('/api/v1/reports/stock-value')]);
//         if (!mounted) return;
//         if (iRes.ok) setInventorySummary(await iRes.json());
//         if (vRes.ok) setStockValue(await vRes.json());
//       } catch (err) {
//         console.error('Report load failed', err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => { mounted = false; };
//   }, [isAdmin]);

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-slate-50 p-6">
//         <div className="max-w-xl mx-auto rounded-lg border border-slate-200 bg-white p-8 text-center">
//           <h2 className="text-xl font-semibold text-rose-600">403 — Access Denied</h2>
//           <p className="mt-2 text-sm text-slate-600">Administrator credentials required to view Reports.</p>
//         </div>
//       </div>
//     );
//   }

//   const maxQty = Math.max(...inventorySummary.map((i) => i.quantity), 1);
//   const maxValue = Math.max(...stockValue.map((s) => s.value), 1);

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <header className="mb-6 flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold text-slate-800">Executive Reports</h1>
//           <p className="text-sm text-slate-500">High-level inventory analytics and stock value.</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="rounded bg-emerald-500 text-white px-3 py-2 text-sm hover:bg-emerald-600">Export Spreadsheet</button>
//           <button className="rounded border border-slate-200 px-3 py-2 text-sm">Print Summary</button>
//         </div>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
//           <h2 className="text-lg font-medium text-slate-800 mb-3">Inventory Summary (by category)</h2>
//           {loading ? (
//             <div className="space-y-3">
//               <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
//               <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
//             </div>
//           ) : inventorySummary.length === 0 ? (
//             <div className="text-sm text-slate-500">No data</div>
//           ) : (
//             <ul className="space-y-3">
//               {inventorySummary.map((it) => (
//                 <li key={it.category} className="flex items-center gap-3">
//                   <div className="flex-1">
//                     <div className="text-sm text-slate-800">{it.category}</div>
//                     <div className="mt-2 h-3 bg-slate-100 rounded overflow-hidden">
//                       <div className="h-3 bg-emerald-400" style={{ width: `${(it.quantity / maxQty) * 100}%` }} />
//                     </div>
//                   </div>
//                   <div className="text-sm font-medium text-slate-900">{it.quantity}</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </section>

//         <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
//           <h2 className="text-lg font-medium text-slate-800 mb-3">Stock Value (by category)</h2>
//           {loading ? (
//             <div className="space-y-3">
//               <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
//             </div>
//           ) : stockValue.length === 0 ? (
//             <div className="text-sm text-slate-500">No data</div>
//           ) : (
//             <ul className="space-y-3">
//               {stockValue.map((it) => (
//                 <li key={it.category} className="flex items-center gap-3">
//                   <div className="flex-1">
//                     <div className="text-sm text-slate-800">{it.category}</div>
//                     <div className="mt-2 h-3 bg-slate-100 rounded overflow-hidden">
//                       <div className="h-3 bg-emerald-400" style={{ width: `${(it.value / maxValue) * 100}%` }} />
//                     </div>
//                   </div>
//                   <div className="text-sm font-medium text-slate-900">${it.value.toLocaleString()}</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }


"use client";

import { useGetInventoryReport } from "@/hooks/reports/useGetInventoryReport";

export default function ReportsPage() {
  const {
    getInventoryReport,
    inventoryReportIsPending,
    error,
  } = useGetInventoryReport();

  if (inventoryReportIsPending) {
    return <p>Loading report...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Failed to load inventory report.
      </p>
    );
  }

  return (
    <div className=" space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Inventory Report
        </h1>

        <p className="text-sm text-muted-foreground sm:text-base">
          Overview of products and current inventory levels.
        </p>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-4 md:hidden">
        {getInventoryReport.map((item) => {
          const quantity = Number(
            item.inventory?.quantity ?? 0
          );

          const costPrice = Number(
            item.cost_price ?? 0
          );

          const reorderLevel = Number(
            item.reorder_level ?? 0
          );

          const isLowStock =
            quantity < reorderLevel;

          const stockValue =
            quantity * costPrice;

          return (
            <div
              key={item.id}
              className="rounded-lg border bg-white p-4 shadow-sm"
            >
              {/* Product + Status */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    SKU: {item.sku}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    isLowStock
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {isLowStock
                    ? "Low Stock"
                    : "In Stock"}
                </span>
              </div>

              {/* Report Details */}
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Quantity
                  </p>

                  <p className="font-medium">
                    {quantity}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Reorder Level
                  </p>

                  <p className="font-medium">
                    {reorderLevel}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Cost Price
                  </p>

                  <p className="font-medium">
                    ₦{costPrice.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Stock Value
                  </p>

                  <p className="font-medium">
                    ₦{stockValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden overflow-x-auto rounded-lg border md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Reorder Level</th>
              <th className="p-3">Status</th>
              <th className="p-3">Stock Value</th>
            </tr>
          </thead>

          <tbody>
            {getInventoryReport.map((item) => {
              const quantity = Number(
                item.inventory?.quantity ?? 0
              );

              const costPrice = Number(
                item.cost_price ?? 0
              );

              const reorderLevel = Number(
                item.reorder_level ?? 0
              );

              const isLowStock =
                quantity < reorderLevel;

              const stockValue =
                quantity * costPrice;

              return (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {item.name}
                  </td>

                  <td className="p-3">
                    {item.sku}
                  </td>

                  <td className="p-3">
                    {quantity}
                  </td>

                  <td className="p-3">
                    {reorderLevel}
                  </td>

                  <td className="p-3">
                    {isLowStock
                      ? "Low Stock"
                      : "In Stock"}
                  </td>

                  <td className="p-3">
                    ₦{stockValue.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

