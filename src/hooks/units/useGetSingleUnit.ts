import { unitsApi } from "@/lib/api/units"
import { useQuery } from "@tanstack/react-query"


export const useGetSingleUnit = (id: string) => {
    const {
        data: unit,
        isPending: isPendingUnit
    } = useQuery ({
        queryKey: ["unit", id],
        queryFn: () => unitsApi.getSingleUnit
    });
    return {unit, isPendingUnit}
}