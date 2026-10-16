"use client";

import { useAuthStore } from "@/zustand/useAuthStore";

export default function DashboardHeader() {
  const auth = useAuthStore((state) => state.auth);
  const user = auth?.user;
  const firstName = user?.name ? user.name.split(" ")[0] : "Adewale";

  return (
    <div className="mb-2">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
        Welcome back, {firstName} <span className="inline-block animate-pulse">👋</span>
      </h1>
      <p className="mt-1 text-sm sm:text-base text-slate-500 font-normal">
        Here's what's happening with your inventory today.
      </p>
    </div>
  );
}