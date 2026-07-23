"use client";


import { useAuthStore } from "@/zustand/useAuthStore";
import Link from "next/link";


export default function Sidebar() {
  const user = useAuthStore((state) => state.auth);
  const role = user?.role ?? 'USER';

  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:block">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">My Inventory</h2>
        <div className="text-xs text-slate-500 mt-1">{user ? user.name : 'Guest'}</div>
      </div>

      <nav className="space-y-1 text-sm">
        <Link href="/" className="block px-3 py-2 rounded hover:bg-slate-50">Dashboard</Link>
        <Link href="/products" className="block px-3 py-2 rounded hover:bg-slate-50">Products</Link>
        {role === 'ADMIN' && (
          <>
            <Link href="/categories" className="block px-3 py-2 rounded hover:bg-slate-50">Categories</Link>
            <Link href="/units" className="block px-3 py-2 rounded hover:bg-slate-50">Units of Measure</Link  >
            <Link href="/suppliers" className="block px-3 py-2 rounded hover:bg-slate-50">Suppliers</Link>
            <Link href="/reports" className="block px-3 py-2 rounded hover:bg-slate-50">Reports</Link>
          </>
        )}
      </nav>
    </aside>
  );
}
