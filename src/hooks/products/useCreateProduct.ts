import { productapi } from "@/lib/api/products"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const {mutate: createProduct, isPending, isSuccess, isError, error} = useMutation ({
        mutationFn: productapi.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]})
        },
    });
    return {createProduct, isPending, isSuccess, isError, error}
}