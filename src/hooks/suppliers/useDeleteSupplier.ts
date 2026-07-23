import { supplierApi } from "@/lib/api/suppliers"
import { useQuery } from "@tanstack/react-query"

export const useDeleteSrupplier = (id:string) => {
    const {
        data: supplier, isPending: isPendingSupplier
    } = useQuery ({
        queryKey: ["supplier", id],
        queryFn: () => supplierApi.deleteSupplier(id)
    });
    return {supplier, isPendingSupplier}
}