

// import { categoriesApi } from "@/lib/api/categories"
// import { useQuery } from "@tanstack/react-query"

// export const useGetCategories = () => {
//   const {
//     data: categories = [],
//     isPending: isPendingCategories,
//     isError,
//   } = useQuery ({
//     queryKey: ["categories"],
//     queryFn: categoriesApi.getAllCategories,
//   });

//   return { categories, isPendingCategories, isError };
// }


import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export const useGetCategories = () => {
  const { data: categories = [], isPending: isPendingCategories, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw error;
      return data;
    },
  });

  return { categories, isPendingCategories, error };
};