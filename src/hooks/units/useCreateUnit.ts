
// import { unitsApi } from "@/lib/api/units";
// import { useMutation, useQueryClient } from "@tanstack/react-query"


// export const useCreateUnit = () => {
//     const queryClient = useQueryClient();
//     const {mutate:createUnit, isPending} = useMutation({
//         mutationFn: unitsApi.createUnit,
//         onSuccess: () =>{
//             queryClient.invalidateQueries({queryKey: ["unit"]})
//         },
//     });

//     return {createUnit, isPending}
// }


import { createUnit } from "@/lib/api/units/createUnit";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useCreateUnit = () => {
    const queryClient = useQueryClient();

    const {
        mutate: createUnitMutation,
        isPending: isCreateUnitPending,
        error,
    } = useMutation ({

        mutationFn: createUnit,

        onSuccess: () => {
            queryClient.invalidateQueries ({
                queryKey: ["units"]
            });
        },
    });

    return {
        createUnitMutation,
        isCreateUnitPending,
        error,
    }
}
   

   
