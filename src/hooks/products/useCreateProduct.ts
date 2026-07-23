import { productapi } from "@/lib/api/products"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const {mutate: createProduct, isPending} = useMutation ({
        mutationFn: productapi.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["product"]})
        },
    });
    return {createProduct, isPending}
}