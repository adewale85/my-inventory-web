import { reportapi } from "@/lib/api/reports"
import { useQuery } from "@tanstack/react-query"

export const useGetInventorySummary = () => {
    const {
        data: getInventorySummary, isPending: inventorySummaryIsPending
    } = useQuery ({
        queryKey: ["getInventorySummary"],
        queryFn: reportapi.getInventorySummary
    });
    return {getInventorySummary, inventorySummaryIsPending}
}