"use client";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500 text-lg">
          Welcome back! Here's what's happening with your inventory today.
        </p>
      </div>

      <div className="rounded-xl border bg-white px-4 py-2 shadow-sm">
        <p className="text-sm font-medium text-slate-600">
          {today}
        </p>
      </div>
    </div>
  );
}