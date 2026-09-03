import { supplierApi } from "@/lib/api/suppliers";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateSupplier = () => {
    const queryClient = useQueryClient();
    const {mutate: createSupplier, isPending} = useMutation ({
        mutationFn: supplierApi.createSupplier ,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["suppliers"]})
        },
        
    });
    return {createSupplier, isPending}
}


