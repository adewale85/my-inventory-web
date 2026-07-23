import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

type StatCardProps = {
  title: string;
  value: string | number;
  loading?: boolean;
  currency?: boolean;
};

export default function StatCard({
  title,
  value,
  loading = false,
  currency = false,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24 animate-pulse rounded-md bg-muted" />
        ) : (
          <p className="text-3xl font-bold">
            {currency && typeof value === "number"
              ? value.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })
              : value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}