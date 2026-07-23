import { unitsApi } from "@/lib/api/units"
import { useQuery } from "@tanstack/react-query";


export const useGetAllUnit = () => {
    const {
        data: units = [], 
        isPending: isPendingUnits,
    } = useQuery ({
        queryKey: ["units"],
        queryFn: unitsApi.getAllUnits
    });
      
    return {isPendingUnits, units}
} 