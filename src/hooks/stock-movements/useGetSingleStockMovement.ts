import { stockMovementApi } from "@/lib/api/stock-movements"
import { useQuery } from "@tanstack/react-query"

export const useGetSingleStockMovement = (id:string) => {
    const {
        data: singleStock, isPending: isPendingSingleStock
    } = useQuery ({
        queryKey: ["StockMovement"],
        queryFn: () => stockMovementApi.getSingleStockMovement(id)
    });
    return {singleStock, isPendingSingleStock}
}