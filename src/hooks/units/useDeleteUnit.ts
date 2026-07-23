import { unitsApi } from "@/lib/api/units";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useDeleteUnit = () => {
    const queryClient = useQueryClient();
    const {mutate: deleteUnit, isPending} = useMutation({
        mutationFn: unitsApi.deleteUnit,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["unit"]});
        },
    });
    return {deleteUnit, isPending};
};