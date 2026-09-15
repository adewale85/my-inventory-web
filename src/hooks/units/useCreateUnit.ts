
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
        mutate: createUnits,
        isPending: isUnitPending,
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
        createUnits,
        isUnitPending,
        error,
    }
}
   

   
