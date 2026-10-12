import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "@/lib/api/categories/updateCategory";
import { CategoryFormValues } from "@/schemas/categoriesSchema";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCategoryMutation, isPending } = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: CategoryFormValues;
    }) => updateCategory(id, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return {
    updateCategory: updateCategoryMutation,
    isPending,
  };
};
