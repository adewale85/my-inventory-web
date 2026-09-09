
// import { categoriesApi } from "@/lib/api/categories";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const useCreateCategory = () => {
//   const queryClient = useQueryClient();

//   const { mutate: createCategory, isPending } = useMutation({
//     mutationFn: categoriesApi.createCategory,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["categories"],
//       });
//     },
//   });

//   return { createCategory, isPending };
// };



import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/lib/api/categories/createCategory";
import { CategoryFormValues } from "@/schemas/categoriesSchema";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CategoryFormValues) =>
      createCategory(values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return {
    createCategory: mutate,
    isPending,
  };
};

