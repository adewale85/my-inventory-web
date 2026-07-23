"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface Movement {
  id: string;
  productName: string;
  type: "IN" | "OUT" | string;
  quantity: number;
  occurredAt: string;
  notes?: string;
  user?: { name: string };
}

export default function TransactionsPage() {
  const { user } = useAuth();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/stock-movements");
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          setMovements(
            data.map((m: any) => ({
              id: m.id,
              productName: m.productName ?? m.product?.name ?? "-",
              type: m.type,
              quantity: m.quantity ?? 0,
              occurredAt: m.occurredAt ?? m.createdAt ?? new Date().toISOString(),
              notes: m.notes ?? m.note ?? "",
              user: m.user ?? m.performedBy ?? undefined,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load movements", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Stock Movement Ledger</h1>
        <p className="text-sm text-slate-500">Immutable log of stock movements (accessible to all roles).</p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          </div>
        ) : movements.length === 0 ? (
          <div className="text-sm text-slate-500">No movements recorded.</div>
        ) : (
          <ul className="space-y-3">
            {movements.map((m) => (
              <li key={m.id} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold rounded px-2 py-1 ${m.type === 'IN' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                      {m.type}
                    </span>
                    <div className="text-sm font-medium text-slate-900">{m.productName}</div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{new Date(m.occurredAt).toLocaleString()} • {m.user?.name ?? 'system'}</div>
                  {m.notes && <div className="mt-2 text-sm text-slate-700">{m.notes}</div>}
                </div>

                <div className="flex flex-col items-end">
                  <div className={`text-lg font-semibold ${m.type === 'IN' ? 'text-emerald-600' : 'text-rose-600'}`}>{m.quantity > 0 ? `+${m.quantity}` : m.quantity}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
