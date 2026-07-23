// import { useQuery } from '@tanstack/react-query';
// import { getCategory } from '@/lib/api/categories/getCategory';

import { categoriesApi } from "@/lib/api/categories"
import { useQuery } from "@tanstack/react-query"

// export const useGetCategory = (id: string) => {
//   return useQuery({
//     queryKey: ['categories', id],
//     queryFn: () => getCategory(id),
//     enabled: !!id, // Only run if ID exists
//   });
// };


export const useCategoryById = (id: string) => {
  const {
    data: category,
    isPending: isPendingCategory,
    isError,
  } = useQuery ({
    queryKey : ["category", id],
    queryFn: () => categoriesApi.getCategory(id),
    enabled: !!id, // Only run if ID exists
  });

  return { category, isPendingCategory, isError };
}