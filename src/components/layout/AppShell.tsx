

"use client";

import React from "react";
import { useAuthStore } from "@/zustand/useAuthStore"; // 1. Import your boss's store
import Sidebar from "@/components/layout/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  // 2. Grab the auth data and actions directly from the Zustand store
  const auth = useAuthStore((state) => state.auth);
  const logout = useAuthStore((state) => state.logout);
  const setAuth = useAuthStore((state) => state.setAuth);

  const user = auth?.user;

  // 3. Mock the role switcher using your boss's setAuth action
  const handleMockRoleChange = (newRole: "ADMIN" | "USER") => {
    if (auth) {
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          role: newRole,
        } as any, // Temporary cast for mocking
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
            <div>
              <h1 className="text-lg font-semibold text-slate-800">My Inventory</h1>
              <div className="text-xs text-slate-500">
                {user ? user.email : "Guest"}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-500">Role</label>
              <select
                value={user?.role ?? "USER"}
                onChange={(e) => handleMockRoleChange(e.target.value as any)}
                className="rounded border border-slate-200 bg-white px-2 py-1 text-sm"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <button
                onClick={logout}
                className="ml-3 rounded bg-emerald-500 text-white px-3 py-1 text-sm hover:bg-emerald-600"
              >
                Logout
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
