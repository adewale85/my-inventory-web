import { productapi } from "@/lib/api/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending } = useMutation({
    mutationFn: (id: string) => productapi.deleteProduct(id),

    onSuccess: () => {
        toast.success("Product delete Successfully")

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

  onError: (error: any) => {
  switch (error.response?.status) {
    case 403:
      toast.error("You don't have permission to perform this action.");
      break;

    case 404:
      toast.error("Product not found.");
      break;

    case 422:
      toast.error("Please check your input.");
      break;

    default:
      toast.error("Something went wrong.");
  }
}
  });

  return { deleteProduct, isPending };
};