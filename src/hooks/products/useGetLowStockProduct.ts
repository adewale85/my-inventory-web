import { productapi } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";


export const useGetLowStockProduct = () => {
    const {
        data: product, isPending: isPendingLowStockProduct,
    } = useQuery ({
        queryKey: ["product"],
        queryFn: productapi.getLowStockProducts 
    });
    return {product, isPendingLowStockProduct}
}