import { productapi } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleProduct = (id: string) => {
    const {data:product, isPending: isPendingProduct,

    }= useQuery ({
    queryKey: ["product", id],
    queryFn: () => productapi.getSingleProduct(id),
    enabled: !!id,
});
return {product, isPendingProduct}
}