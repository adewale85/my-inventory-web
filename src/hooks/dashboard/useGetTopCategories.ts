import { dashboardapi } from "@/lib/api/dashboard"
import { useQuery } from "@tanstack/react-query"

export const useGetTopCategories = () => {
    const {
        data: topCategories ,
        isPending : isPendingdataTopCategories ,
    } = useQuery ({
        queryKey: ["topCategories"],
        queryFn: dashboardapi.getTopCategories
    });
    return {topCategories, isPendingdataTopCategories}
}