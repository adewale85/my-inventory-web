"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type Props = {
  data: {
    date: string;
    quantity: number;
  }[];
  loading?: boolean;
};

const chartConfig = {
  quantity: {
    label: "Units",
    color: "#3B82F6",
  },
} satisfies ChartConfig;

export default function RecentStockMovementChart({
  data,
  loading,
}: Props) {
  if (loading) {
    return (
      <div className="h-[360px] animate-pulse rounded-xl bg-slate-100" />
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[360px] w-full"
    >
      <AreaChart
        data={data}
        margin={{
          left: 10,
          right: 10,
          top: 20,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient
            id="movementGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="var(--color-quantity)"
              stopOpacity={0.45}
            />

            <stop
              offset="95%"
              stopColor="var(--color-quantity)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          vertical={false}
          strokeOpacity={0.12}
        />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={12}
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
            />
          }
        />

        <Area
          dataKey="quantity"
          type="monotone"
          stroke="var(--color-quantity)"
          strokeWidth={3}
          fill="url(#movementGradient)"
          fillOpacity={1}
          dot={false}
          activeDot={{
            r: 7,
          }}
        />
      </AreaChart>
    </ChartContainer>
  );
}