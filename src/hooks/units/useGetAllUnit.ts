// import { unitsApi } from "@/lib/api/units"
// import { useQuery } from "@tanstack/react-query";


// export const useGetAllUnit = () => {
//     const {
//         data: units = [], 
//         isPending: isPendingUnits,
//     } = useQuery ({
//         queryKey: ["units"],
//         queryFn: unitsApi.getAllUnits
//     });
      
//     return {isPendingUnits, units}
// } 


import { supabase } from "@/supabase/client"
import { useQuery } from "@tanstack/react-query"



export const useGetAllUnit = () => {
    const {data: units = [], isPending: isPendingUnits, error } = useQuery ({
        queryKey: ["units"],
        queryFn: async () => {
            const {data, error} = await supabase
            .from ("units")
            .select ("*")
            if (error) throw error
            return data
        }
    });

    return {units, isPendingUnits, error}
}