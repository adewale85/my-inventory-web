"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PackagePlus } from "lucide-react";

export default function StockPromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-100/80 bg-gradient-to-br from-blue-50/80 via-indigo-50/30 to-white p-5 shadow-xs transition hover:shadow-md">
      {/* Decorative top right accent */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-100/40 blur-xl" />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
        <div className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
            <PackagePlus className="h-5 w-5" />
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900">
              Keep your business well stocked
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Ensure seamless operations with accurate stock management.
            </p>
          </div>
        </div>

        <div>
          <Link
            href="/products"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <span>Add Product</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

