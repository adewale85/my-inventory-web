import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { InventoryByCategoryResponse } from "@/types/dashboard";







interface Props {
  data: InventoryByCategoryResponse[];
}

const chartConfig = {
  total_quantity: {
    label: "Quantity",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function InventoryBarChart ({data}: Props) {
  return(
    <ChartContainer
    config={chartConfig}
    className="h-[350px] w-full">

      <BarChart
      accessibilityLayer data={data}
      margin={{
        top: 20,
        right: 20,
        left: 10,
        bottom: 10,
      }}
      >
      
       <CartesianGrid vertical={false} />

        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />

         <YAxis
          tickLine={false}
          axisLine={false}
        />

         <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

         <Bar
          dataKey="total_quantity"
          fill="var(--color-total_quantity)"
          radius={[8, 8, 0, 0]}
        />

      </BarChart>
      
    </ChartContainer>
  );
}







// "use client";

// import { InventoryByCategoryResponse } from "@/types/dashboard";
// import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";




// interface Props {
//   data: InventoryByCategoryResponse[];
// }

// export default function InventoryBarChart({ data }: Props) {
//   console.log(data);
//   return (
//     <BarChart width={700} height={350} data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       {/* <Tooltip /> */}
//       <Bar dataKey="total_quantity" fill="#2563eb" radius={[6, 6, 0, 0]} />
//     </BarChart>
//   );
// }
