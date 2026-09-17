import { reportapi } from "@/lib/api/reports"
import { useQuery } from "@tanstack/react-query"

export const useGetInventoryReport = () => {
    const {
        data: getInventoryReport, isPending: inventoryReportIsPending, error
    } = useQuery ({
        queryKey: ["getInventoryReport"],
        queryFn: reportapi.getInventoryReport
    });
    return {getInventoryReport, inventoryReportIsPending, error}
}


