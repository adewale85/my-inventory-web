import { supplierApi } from "@/lib/api/suppliers";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreatSupplier = () => {
    const queryClient = useQueryClient();
    const {mutate: createSupplier, isPending} = useMutation ({
        mutationFn: supplierApi.createSupplier ,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["supplier"]})
        },
        
    });
    return {createSupplier, isPending}
}