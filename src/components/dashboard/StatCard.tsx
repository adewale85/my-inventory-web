import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Color = "blue" | "green" | "orange" | "red" | "purple";

type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  loading?: boolean;
  currency?: boolean;
  color?: Color;
};

const iconColors = {
  blue: "bg-blue-500/15 text-blue-300",
  green: "bg-emerald-500/15 text-emerald-300",
  orange: "bg-orange-500/15 text-orange-300",
  red: "bg-red-500/15 text-red-300",
  purple: "bg-violet-500/15 text-violet-300",
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  loading = false,
  currency = false,
  color = "blue",
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-0",
        "bg-slate-800",
        "border-white/10",
        "border",
        "shadow-xl",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:shadow-2xl"

      )}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-6">
        <div>
          <CardTitle className="text-sm font-medium tracking-wide text-slate-300">
            {title}
          </CardTitle>
        </div>

        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm",
            iconColors[color]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <>
            <Skeleton className="mb-3 h-8 w-28 bg-slate-700" />
            <Skeleton className="h-4 w-36 bg-slate-700" />
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold tracking-tight text-white">
              {currency && typeof value === "number"
                ? value.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    maximumFractionDigits: 0,
                  })
                : value}
            </h2>

            {description && (
              <p className="mt-3 text-sm text-slate-400">
                {description}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}