import { supplierApi } from "@/lib/api/suppliers"
import { useQuery } from "@tanstack/react-query"

export const useGetSingleSupplier = (id:string) => {
    const {
        data: supplier, isLoading: isLoadingSupplier
    } = useQuery ({
        queryKey: ["supplier", id],
        queryFn: () => supplierApi.getSingleProduct(id)
        
    });
    return {supplier, isLoadingSupplier}
}