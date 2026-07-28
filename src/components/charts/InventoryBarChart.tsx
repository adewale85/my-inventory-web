"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";

import { InventoryByCategoryResponse } from "@/types/dashboard";

interface Props {
  data: InventoryByCategoryResponse[];
}

const chartConfig = {
  total_quantity: {
    label: "Quantity",
    color: "#3B82F6",
  },
} satisfies ChartConfig;

export default function InventoryBarChart({ data }: Props) {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-[360px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 10,
            right: 40,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid
            horizontal={false}
            strokeOpacity={0.08}
          />

          <XAxis
            type="number"
            hide
          />

          <YAxis
            type="category"
            dataKey="name"
            tickLine={false}
            axisLine={false}
            width={110}
            tick={{
              fill: "#475569",
              fontSize: 13,
              fontWeight: 500,
            }}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent />}
          />

          <Bar
            dataKey="total_quantity"
            radius={8}
            barSize={18}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill="#3B82F6"
              />
            ))}

            <LabelList
              dataKey="total_quantity"
              position="right"
              style={{
                fill: "#0F172A",
                fontWeight: 600,
                fontSize: 13,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}