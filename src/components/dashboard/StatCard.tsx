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
    bg: "bg-blue-500/10 dark:bg-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    ring: "ring-blue-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/20",
  },
  purple: {
    bg: "bg-purple-500/10 dark:bg-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    ring: "ring-purple-500/20",
  },
  rose: {
    bg: "bg-rose-500/10 dark:bg-rose-500/20",
    text: "text-rose-500 dark:text-rose-400",
    ring: "ring-rose-500/20",
  },
  sky: {
    bg: "bg-sky-500/10 dark:bg-sky-500/20",
    text: "text-sky-600 dark:text-sky-400",
    ring: "ring-sky-500/20",
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
    <div className="group flex flex-col justify-between rounded-2xl border border-border bg-card text-card-foreground p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3.5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.bg} ${styles.text} ring-1 ${styles.ring} transition-transform duration-200 group-hover:scale-105`}
        >
          <Icon className="h-6 w-6 stroke-[2.2]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-muted-foreground truncate tracking-tight">
            {title}
          </p>

          {loading ? (
            <Skeleton className="mt-1 h-7 w-20 rounded bg-muted" />
          ) : (
            <h3 className="mt-0.5 text-2xl font-extrabold tracking-tight text-foreground">
              {formattedValue}
            </h3>
          )}
        </div>
      </div>

      {trend && (
        <div className="mt-3.5 flex items-center gap-1.5 text-xs">
          <div
            className={`flex items-center font-bold ${
              trend.isGood ?? trend.isUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
            }`}
          >
            {trend.isUp ? (
              <ArrowUp className="mr-0.5 h-3 w-3 stroke-[3]" />
            ) : (
              <ArrowDown className="mr-0.5 h-3 w-3 stroke-[3]" />
            )}
            {trend.value}
          </div>
          <span className="text-muted-foreground font-medium">
            {trend.label || "vs last month"}
          </span>
        </div>
      )}
    </div>
  );
}