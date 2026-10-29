"use client";

import React from "react";
import NewSaleSection from "@/components/sales/NewSaleSection";
import SalesHistoryTable from "@/components/sales/SalesHistoryTable";
import { ShoppingCart } from "lucide-react";

export default function SalesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShoppingCart className="size-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Sales
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Point of sale terminal: process customer sales and audit transaction history.
          </p>
        </div>
      </div>

      {/* Point of Sale Section (Product selector + Current Cart) */}
      <section aria-label="New Sale Section">
        <NewSaleSection />
      </section>

     
    </div>
  );
}
