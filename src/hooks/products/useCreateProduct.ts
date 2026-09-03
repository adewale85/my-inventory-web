// import { productapi } from "@/lib/api/products"
// import { useMutation, useQueryClient } from "@tanstack/react-query"

// export const useCreateProduct = () => {
//     const queryClient = useQueryClient();
//     const {mutate: createProduct, isPending, isSuccess, isError, error} = useMutation ({
//         mutationFn: productapi.createProduct,
//         onSuccess: () => {
//             queryClient.invalidateQueries({queryKey: ["products"]})
//         },
//     });
//     return {createProduct, isPending, isSuccess, isError, error}
// }



import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "@/lib/api/products/createProduct";
import { ProductFormValues } from "@/schemas/productSchema";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: ProductFormValues) => createProductApi(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { createProduct: mutate, isPending };
};


