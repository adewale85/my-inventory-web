
import { categoriesApi } from "@/lib/api/categories";
import { CategoryPayload } from "@/types/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateCategoryPayload = {
  id: string;
  payload: CategoryPayload;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const {mutate: updateCategory, isPending} = useMutation ({
    mutationFn: ({id, payload}: UpdateCategoryPayload) => 
      categoriesApi.updateCategory(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });

  return { updateCategory, isPending };
}
