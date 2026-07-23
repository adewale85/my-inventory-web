import { dashboardapi } from "@/lib/api/dashboard"
import { useQuery } from "@tanstack/react-query"

export const useGetRecentStockMovements = () => {
    const {
        data: recentStockMovements ,
        isPending: isPendingRecentStockMovements,
    } = useQuery ({
        queryKey: ["recent-stock-movements"],
        queryFn: dashboardapi.getRecentStockMovements
    });
    return {recentStockMovements, isPendingRecentStockMovements}
}
