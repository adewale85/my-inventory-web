"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Check,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";

import { useAuthStore } from "@/zustand/useAuthStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const auth = useAuthStore((state) => state.auth);
  const logout = useAuthStore((state) => state.logout);

  const user = auth?.user;
  const role = user?.role?.trim().toUpperCase() ?? "";
  /* const role = user?.role?.toUpperCase() || "ADMIN";*/

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
    { name: "Sales", href: "/sales", icon: ShoppingCart },
    { name: "SalesHistory", href: "/salesHistory", icon: ShoppingCart},
    { name: "Categories", href: "/categories", icon: Tags, adminOnly: true },
    { name: "Units of Measure", href: "/units", icon: Ruler, adminOnly: true },
    { name: "Suppliers", href: "/suppliers", icon: Truck, adminOnly: true },
    { name: "Inventory", href: "/inventory", icon: Boxes, adminOnly: true},
    { name: "Stock Movement", href: "/stock-movement", icon: ArrowLeftRight, adminOnly: true },
    { name: "Reports", href: "/reports", icon: FileText, adminOnly: true },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex min-h-screen w-64 flex-col
          border-r border-slate-100 bg-white
          transition-transform duration-300 ease-in-out
          md:static md:z-auto md:flex md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white shadow-md shadow-blue-500/25">
              <Boxes className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-none tracking-tight text-slate-900">
                MyInventory
              </h2>
              <p className="mt-1 text-xs font-normal text-slate-400">
                Management System
              </p>
            </div>
          </div>

          {/* Close button - mobile only */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-2">
          {navItems.map((item) => {
            if (item.adminOnly && role !== "ADMIN") return null;

            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md shadow-blue-500/25 font-semibold"
                      : "text-slate-600 hover:bg-blue-50/70 hover:text-blue-600"
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          
        </nav>

        {/* User Card & Bottom Actions */}
        <div className="border-t border-slate-100 p-4">
          {/* User Profile Card */}
          <div className="mb-3 flex items-center justify-between rounded-2xl bg-slate-50/80 p-3 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-sm font-bold text-white shadow-sm">
                  {user?.name?.charAt(0).toUpperCase() || "A"}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] text-white ring-2 ring-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {user?.name || "Adewale Odusola"}
                </p>
                <div className="mt-0.5">
                  <span className="inline-block rounded-md bg-blue-100 px-1.5 py-0.2 text-[10px] font-bold tracking-wider text-blue-700">
                    {role}
                  </span>
                </div>
              </div>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>

          {/* Settings & Logout */}
          <div className="space-y-1">
            <Link
              href="/settings"
              onClick={onClose}
              className={`
                flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium transition
                ${
                  pathname === "/settings"
                    ? "bg-blue-500 text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}