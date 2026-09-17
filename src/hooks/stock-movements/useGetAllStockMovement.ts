import { getAllStockMovements } from "@/lib/api/stock-movements/getAllStockMovements";
import { useQuery } from "@tanstack/react-query";

export const useGetAllStockMovements = () => {
  const {
    data: stockMovements = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["stock-movements"],
    queryFn: getAllStockMovements,
  });

  return { stockMovements, isPending, error };
};