import { processStockMovement } from "@/lib/api/stock-movements/processStockMovement";
import { StockMovementPayload } from "@/types/stockMovement";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProcessStockMovement = () => {
    const queryClient = useQueryClient();

    const {mutate, isPending, error} = useMutation({
        mutationFn: (payload: StockMovementPayload) => processStockMovement(payload),
    
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["inventory"],
            });

            queryClient.invalidateQueries({
                queryKey: ["stock-movements"],
            })
        }
    });

     return {processStockMovement: mutate, isPending, error}
}