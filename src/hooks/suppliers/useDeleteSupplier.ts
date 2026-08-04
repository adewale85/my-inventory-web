// import { supplierApi } from "@/lib/api/suppliers"
// import { useQuery } from "@tanstack/react-query"

import { supplierApi } from "@/lib/api/suppliers";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

// export const useDeleteSupplier = (id:string) => {
//     const {
//         data: supplier, isPending: isPendingSupplier
//     } = useQuery ({
//         queryKey: ["supplier", id],
//         queryFn: () => supplierApi.deleteSupplier(id)
//     });
//     return {supplier, isPendingSupplier}
// }

export const useDeleteSupplier = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteSupplier, isPending: deleteIsPending } = useMutation({
        mutationFn: (id: string) => supplierApi.deleteSupplier(id),
        onSuccess: () => {

            toast.success("Supplier deleted successfully");

            queryClient.invalidateQueries({ queryKey: ["supplier"] });
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




    return { deleteSupplier, deleteIsPending };
}