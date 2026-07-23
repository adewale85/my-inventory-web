import { stockMovementApi } from "@/lib/api/stock-movements"
import { useQuery } from "@tanstack/react-query"

export const useGetAllStockMovement = () => {
    const {
        data: allStockMovement, isPending: allStockMovementIspending
    } = useQuery ({
        queryKey: ["StockMovement"],
        queryFn: stockMovementApi.getAllStockMovements
    });
    return {allStockMovement, allStockMovementIspending}
}