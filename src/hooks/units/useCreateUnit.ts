
import { unitsApi } from "@/lib/api/units";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateUnit = () => {
    const queryClient = useQueryClient();
    const {mutate:createUnit, isPending} = useMutation({
        mutationFn: unitsApi.createUnit,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ["unit"]})
        },
    });

    return {createUnit, isPending}
}