import { supplierApi } from "@/lib/api/suppliers"
import { useQuery } from "@tanstack/react-query";


export const useGetAllSuppliers = () => {
    const {
        data: suppliers, isPending: isPendingSuppliers
    } = useQuery ({
        queryKey: ["suppliers"],
        queryFn: supplierApi.getAllSuppliers
    });
    return {suppliers, isPendingSuppliers}
}