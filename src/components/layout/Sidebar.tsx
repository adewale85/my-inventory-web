"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Tags,
  Ruler,
  Truck,
  Boxes,
  ArrowLeftRight,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "@/zustand/useAuthStore";

export default function Sidebar() {
  const auth = useAuthStore((state) => state.auth);
  const logout = useAuthStore((state) => state.logout);

  const user = auth?.user;
  const role = user?.role?.toUpperCase();

  return (
    <aside className="hidden min-h-screen w-64 flex-col border-r border-slate-200 bg-white md:flex">
      {/* Logo */}
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-xl font-bold text-blue-600">
          My Inventory
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Inventory Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-90 hover:text-blue-600"
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>

        <Link
          href="/products"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <Package className="h-5 w-5" />
          Products
        </Link>

        {/* Admin only */}
        {role === "ADMIN" && (
          <>
            <Link
              href="/categories"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Tags className="h-5 w-5" />
              Categories
            </Link>

            <Link
              href="/units"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Ruler className="h-5 w-5" />
              Units of Measure
            </Link>

            <Link
              href="/suppliers"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Truck className="h-5 w-5" />
              Suppliers
            </Link>

            <Link
              href="/stock-movement"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <ArrowLeftRight className="h-5 w-5" />
              Stock Movement
            </Link>

            <Link
              href="/reports"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <FileText className="h-5 w-5" />
              Reports
            </Link>
          </>
        )}

        <Link
          href="/inventory"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <Boxes className="h-5 w-5" />
          Inventory
        </Link>
      </nav>

      {/* User section */}
      <div className="border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-blue-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user?.name || "User"}
            </p>

            <p className="text-xs font-medium text-blue-600">
              {role || "USER"}
            </p>
          </div>
        </div>

        <Link
          href="/settings"
          className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}