

import { categoriesApi } from "@/lib/api/categories"
import { useQuery } from "@tanstack/react-query"

export const useGetCategories = () => {
  const {
    data: categories = [],
    isPending: isPendingCategories,
    isError,
  } = useQuery ({
    queryKey: ["categories"],
    queryFn: categoriesApi.getAllCategories,
  });

  return { categories, isPendingCategories, isError };
}