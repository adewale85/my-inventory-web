import { productapi } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = () => {
  const {
    data: products = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productapi.getAllProducts,
  });

  return {
    products,
    isPending,
    isError,
    error,
  };
};