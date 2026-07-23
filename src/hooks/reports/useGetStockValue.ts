import { reportapi } from "@/lib/api/reports"
import { useQuery } from "@tanstack/react-query"

export const useGetStockValue = () => {
    const {data: getStockValue, 
        isPending: stockValueIspending
    } = useQuery ({
        queryKey: ["getStockValue"],
        queryFn: reportapi.getStockValue
    });
    return {getStockValue, stockValueIspending}
}