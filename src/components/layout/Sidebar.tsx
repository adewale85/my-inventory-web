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
  X,
} from "lucide-react";

import { useAuthStore } from "@/zustand/useAuthStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const auth = useAuthStore((state) => state.auth);
  const logout = useAuthStore((state) => state.logout);

  const user = auth?.user;
  const role = user?.role?.toUpperCase();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex min-h-screen w-64 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          md:static md:z-auto md:flex md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-blue-600">
              My Inventory
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Inventory Management
            </p>
          </div>

          {/* Close button - mobile only */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/products"
            onClick={onClose}
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
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <Tags className="h-5 w-5" />
                Categories
              </Link>

              <Link
                href="/units"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <Ruler className="h-5 w-5" />
                Units of Measure
              </Link>

              <Link
                href="/suppliers"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <Truck className="h-5 w-5" />
                Suppliers
              </Link>

              <Link
                href="/stock-movement"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <ArrowLeftRight className="h-5 w-5" />
                Stock Movement
              </Link>

              <Link
                href="/reports"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <FileText className="h-5 w-5" />
                Reports
              </Link>
            </>
          )}

          <Link
            href="/inventory"
            onClick={onClose}
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
            onClick={onClose}
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
    </>
  );
}