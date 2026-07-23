import { stockMovementApi } from "@/lib/api/stock-movements";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useRecordStockMovement = () => {
    const queryClient = useQueryClient();
    const {mutate:recordStockMovement, isPending } = useMutation ({
        mutationFn: stockMovementApi.recordStockMovement,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["StockMovement"]})
        },
    });
    return {recordStockMovement, isPending}
}