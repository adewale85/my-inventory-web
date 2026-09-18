

"use client";

import React from "react";
import { useAuthStore } from "@/zustand/useAuthStore"; // 1. Import your boss's store
import Sidebar from "@/components/layout/Sidebar";
import { Bell, Menu, Moon, Search } from "lucide-react";

export default function AppShell({ children }: { children: React.ReactNode }) {

  const auth = useAuthStore((state) => state.auth);
 
  const user = auth?.user;


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
        <header className="flex h-16 items-center justify-end border-b border-slate-200 bg-white px-4 sm:px-12 gap-16">
  {/* Left side */}
  <div className="flex items-center justify-between gap-4">
    <button
      type="button"
      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:hidden flex"
      aria-label="Open menu" 
    >
      <Menu className="h-5 w-5" />
    </button>

    {/* Search */}
    <div className="relative ">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        placeholder="Search..."
        className="h-10 w-56 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 lg:w-72"
      />
    </div>
  </div>

  {/* Right side */}
  <div className="flex items-center gap-2 sm:gap-4">
    {/* Theme */}
    <button
      type="button"
      className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
      aria-label="Toggle theme"
    >
      <Moon className="h-5 w-5" />
    </button>

    {/* Notifications */}
    <button
      type="button"
      className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />

      <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
    </button>

    {/* Profile */}
    <button
      type="button"
      className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
        {user?.name?.charAt(0).toUpperCase() ?? "G"}
      </div>

      <div className="hidden text-left sm:block">
        <p className="text-sm font-medium text-slate-800">
          {user?.name ?? "Guest"}
        </p>

        <p className="text-xs text-slate-500">
          {user?.role ?? "USER"}
        </p>
      </div>
    </button>
  </div>
</header>

          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import React from "react";
// import { useAuth } from "@/context/AuthContext";
// import Sidebar from "@/components/Sidebar";

// export default function AppShell({ children }: { children: React.ReactNode }) {
//   const { user, setMockRole, logout } = useAuth();

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1">
//           <header className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
//             <div>
//               <h1 className="text-lg font-semibold text-slate-800">My Inventory</h1>
//               <div className="text-xs text-slate-500">{user ? user.email : "Guest"}</div>
//             </div>
//             <div className="flex items-center gap-3">
//               <label className="text-xs text-slate-500">Role</label>
//               <select
//                 value={user?.role ?? "USER"}
//                 onChange={(e) => setMockRole(e.target.value as any)}
//                 className="rounded border border-slate-200 bg-white px-2 py-1 text-sm"
//               >
//                 <option value="USER">USER</option>
//                 <option value="ADMIN">ADMIN</option>
//               </select>
//               <button onClick={logout} className="ml-3 rounded bg-emerald-500 text-white px-3 py-1 text-sm hover:bg-emerald-600">
//                 Logout
//               </button>
//             </div>
//           </header>

//           <main className="p-6">{children}</main>
//         </div>
//       </div>
//     </div>
//   );
// }
