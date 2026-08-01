
import { categoriesApi } from "@/lib/api/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: createCategory, isPending } = useMutation({
    mutationFn: categoriesApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return { createCategory, isPending };
};