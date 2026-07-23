import { supplierApi } from "@/lib/api/suppliers";
import { SupplierResponsePayload } from "@/types/suppliers";
import { useMutation, useQueryClient } from "@tanstack/react-query"


type UpdateSupplierPayload = {
    id: string;
    payload: SupplierResponsePayload;
};

export const useUpdateSupplier = () => {
    const queryClient = useQueryClient();
    const {mutate: updateSupplier, isPending} = useMutation ({
        mutationFn: ({id, payload}: UpdateSupplierPayload) => 
            supplierApi.updateSupplier(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["supplier"],
            });
        },
    });

    return {updateSupplier, isPending}
}