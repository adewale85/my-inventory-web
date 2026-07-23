
// import { useQuery } from "@tanstack/react-query";
// import { getAllProducts } from "@/lib/api/products/getAllProducts";


// export function useProducts() {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: async () => { 
//       const response = await getAllProducts();
//       return (response as unknown) as {data: any [] };
//       },
//   });
// }





/**
 * Hook to handle deleting a single product
 */
// export function useDeleteProduct() {
//   const queryClient = useQueryClient();

//   // const {mutate, isPending} = useMutation

//   return useMutation({
//     mutationFn: async (id: string | number) => {
//       return deleteProduct(id);
//     },
//     onSuccess: () => {
//       // Auto-refresh the products list cache keys
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//     },
//     onError: (err: any) => {
//       alert(err?.message || "Something went wrong while removing this item.");
//     },
//   });
// }