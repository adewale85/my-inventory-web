// import { supplierApi } from "@/lib/api/suppliers"
// import { useQuery } from "@tanstack/react-query"

import { supplierApi } from "@/lib/api/suppliers";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

// export const useDeleteSupplier = (id:string) => {
//     const {
//         data: supplier, isPending: isPendingSupplier
//     } = useQuery ({
//         queryKey: ["supplier", id],
//         queryFn: () => supplierApi.deleteSupplier(id)
//     });
//     return {supplier, isPendingSupplier}
// }

export const useDeleteSupplier = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteSupplier, isPending: deleteIsPending } = useMutation({
        mutationFn: (id: string) => supplierApi.deleteSupplier(id),
        onSuccess: () => {
            toast.success("Supplier deleted successfully");

            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        }
    });
    return { deleteSupplier, deleteIsPending };
}