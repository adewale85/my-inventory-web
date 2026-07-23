import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api/categories';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: categoriesApi.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return { deleteCategory, isPending };
};
  