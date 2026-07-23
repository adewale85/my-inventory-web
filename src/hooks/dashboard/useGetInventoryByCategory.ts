import { dashboardapi } from "@/lib/api/dashboard"
import { useQuery } from "@tanstack/react-query"

export const useGetInventoryByCategory = () => {
    const {
        data: inventory , 
        isPending: isPendingDashboard,
    } = useQuery ({
        queryKey: ["inventory"],
        queryFn: dashboardapi.getInventoryByCategory
    });

    return {inventory, isPendingDashboard}
}