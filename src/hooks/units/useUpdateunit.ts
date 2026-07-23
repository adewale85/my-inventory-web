import { unitsApi } from "@/lib/api/units";
import { unitOfMeasureResponsePayload } from "@/types/unit";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type updateUnitPayload = {
    id: string
    payload: unitOfMeasureResponsePayload;
};

export const useUpdateUnit = () =>{
    const queryClient = useQueryClient();

    const {mutate: updateUnit, isPending} = useMutation ({
        mutationFn: ({id, payload}: updateUnitPayload) => 
            unitsApi.updateUnit (id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["unit"],
            });
        },

    });

    return {updateUnit, isPending}
}