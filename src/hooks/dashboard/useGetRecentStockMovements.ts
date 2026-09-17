import { useQuery } from "@tanstack/react-query";
import { getAllStockMovements } from "@/lib/api/stock-movements/getAllStockMovements";

export const useGetRecentStockMovements = () => {
  const {
    data: recentStockMovements = [],
    isPending: isPendingRecentStockMovements,
    error,
  } = useQuery({
    queryKey: ["recent-stock-movements"],
    queryFn: getAllStockMovements,
  });

  return {
    recentStockMovements,
    isPendingRecentStockMovements,
    error,
  };
};