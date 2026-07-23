
import { dashboardapi } from "@/lib/api/dashboard"
import { useQuery } from "@tanstack/react-query"


export const useGetDashboardStats = () => {
    const {
        data: dashboard,
        isPending: isPendingDashboard,
    } = useQuery ({
        queryKey: ["dashboard"],
        queryFn: dashboardapi.getDashboardStats
    });

    return {dashboard, isPendingDashboard}
}
