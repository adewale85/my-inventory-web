import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductFormValues } from "@/schemas/productSchema";
import { updateProduct } from "@/lib/api/products/updateProduct";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProductMutation, isPending } = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: ProductFormValues;
    }) => updateProduct(id, values),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    updateProduct: updateProductMutation,
    isPending,
  };
};