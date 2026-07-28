"use client"

import { useGetTopCategories } from "@/hooks/dashboard/useGetTopCategories";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function TopCategories () {
    const {
        topCategories,isPendingdataTopCategories 
    } =  useGetTopCategories()

    if (isPendingdataTopCategories) {
        return(
            <Card>
                <CardHeader>
                    <CardTitle>Top Categories</CardTitle>
                </CardHeader>

                <CardContent>
                    {Array.from({length: 4}).map((_, i)=>(
                        <div key={i} className="space-y-2">
                            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
              <div className="h-2 w-full animate-pulse rounded bg-slate-100" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        )
    }
    if (!topCategories?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
        </CardHeader>

        <CardContent>
          No category data available.
        </CardContent>
      </Card>
    );
  }
   const highestValue = Math.max(
    ...topCategories.map((c) => Number(c.total_value))
  );

  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">
          Top Categories by Value
        </CardTitle>

        <CardDescription>
          Highest valued inventory categories
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {topCategories.slice(0, 5).map((category) => {
          const progress =
            (Number(category.total_value) / highestValue) * 100;

          return (
            <div
              key={category.id}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {category.name}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    {category.product_count} Products •{" "}
                    {category.total_quantity} Units
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-slate-900">
                    {Number(category.total_value).toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </p>
                </div>
              </div>

              <progress
                value={progress}
                className="h-2"
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );

}