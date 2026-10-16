"use client";

import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown } from "lucide-react";

type Color = "blue" | "emerald" | "purple" | "rose" | "sky";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  color: Color;
  trend?: {
    value: string;
    isUp?: boolean;
    isGood?: boolean;
    label?: string;
  };
  loading?: boolean;
  currency?: boolean;
}

const colorStyles: Record<
  Color,
  { bg: string; text: string; ring: string }
> = {
  blue: {
    bg: "bg-blue-50/80",
    text: "text-blue-600",
    ring: "ring-blue-100",
  },
  emerald: {
    bg: "bg-emerald-50/80",
    text: "text-emerald-600",
    ring: "ring-emerald-100",
  },
  purple: {
    bg: "bg-purple-50/80",
    text: "text-purple-600",
    ring: "ring-purple-100",
  },
  rose: {
    bg: "bg-rose-50/80",
    text: "text-rose-500",
    ring: "ring-rose-100",
  },
  sky: {
    bg: "bg-sky-50/80",
    text: "text-sky-600",
    ring: "ring-sky-100",
  },
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  loading = false,
  currency = false,
}: StatCardProps) {
  const styles = colorStyles[color];

  const formattedValue =
    typeof value === "number"
      ? currency
        ? value.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
          })
        : value.toLocaleString()
      : value;

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-slate-100/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3.5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.bg} ${styles.text} ring-1 ${styles.ring} transition-transform duration-200 group-hover:scale-105`}
        >
          <Icon className="h-6 w-6 stroke-[2.2]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-500 truncate tracking-tight">
            {title}
          </p>

          {loading ? (
            <Skeleton className="mt-1 h-7 w-20 rounded bg-slate-100" />
          ) : (
            <h3 className="mt-0.5 text-2xl font-extrabold tracking-tight text-slate-900">
              {formattedValue}
            </h3>
          )}
        </div>
      </div>

      {trend && (
        <div className="mt-3.5 flex items-center gap-1.5 text-xs">
          <div
            className={`flex items-center font-bold ${
              trend.isGood ?? trend.isUp ? "text-emerald-600" : "text-rose-500"
            }`}
          >
            {trend.isUp ? (
              <ArrowUp className="mr-0.5 h-3 w-3 stroke-[3]" />
            ) : (
              <ArrowDown className="mr-0.5 h-3 w-3 stroke-[3]" />
            )}
            {trend.value}
          </div>
          <span className="text-slate-400 font-medium">
            {trend.label || "vs last month"}
          </span>
        </div>
      )}
    </div>
  );
}