"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface InventorySummaryItem { category: string; quantity: number }
interface StockValueItem { category: string; value: number }

export default function ReportsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const [inventorySummary, setInventorySummary] = useState<InventorySummaryItem[]>([]);
  const [stockValue, setStockValue] = useState<StockValueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return setLoading(false);
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [iRes, vRes] = await Promise.all([fetch('/api/v1/reports/inventory-summary'), fetch('/api/v1/reports/stock-value')]);
        if (!mounted) return;
        if (iRes.ok) setInventorySummary(await iRes.json());
        if (vRes.ok) setStockValue(await vRes.json());
      } catch (err) {
        console.error('Report load failed', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-xl mx-auto rounded-lg border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-rose-600">403 — Access Denied</h2>
          <p className="mt-2 text-sm text-slate-600">Administrator credentials required to view Reports.</p>
        </div>
      </div>
    );
  }

  const maxQty = Math.max(...inventorySummary.map((i) => i.quantity), 1);
  const maxValue = Math.max(...stockValue.map((s) => s.value), 1);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Executive Reports</h1>
          <p className="text-sm text-slate-500">High-level inventory analytics and stock value.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded bg-emerald-500 text-white px-3 py-2 text-sm hover:bg-emerald-600">Export Spreadsheet</button>
          <button className="rounded border border-slate-200 px-3 py-2 text-sm">Print Summary</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium text-slate-800 mb-3">Inventory Summary (by category)</h2>
          {loading ? (
            <div className="space-y-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
            </div>
          ) : inventorySummary.length === 0 ? (
            <div className="text-sm text-slate-500">No data</div>
          ) : (
            <ul className="space-y-3">
              {inventorySummary.map((it) => (
                <li key={it.category} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-sm text-slate-800">{it.category}</div>
                    <div className="mt-2 h-3 bg-slate-100 rounded overflow-hidden">
                      <div className="h-3 bg-emerald-400" style={{ width: `${(it.quantity / maxQty) * 100}%` }} />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-900">{it.quantity}</div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium text-slate-800 mb-3">Stock Value (by category)</h2>
          {loading ? (
            <div className="space-y-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
            </div>
          ) : stockValue.length === 0 ? (
            <div className="text-sm text-slate-500">No data</div>
          ) : (
            <ul className="space-y-3">
              {stockValue.map((it) => (
                <li key={it.category} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-sm text-slate-800">{it.category}</div>
                    <div className="mt-2 h-3 bg-slate-100 rounded overflow-hidden">
                      <div className="h-3 bg-emerald-400" style={{ width: `${(it.value / maxValue) * 100}%` }} />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-900">${it.value.toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
