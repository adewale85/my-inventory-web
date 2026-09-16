import { getInventory } from "@/lib/api/inventory/getInventory"
import { useQuery } from "@tanstack/react-query"

export const useGetInventory = () => {
        const {data: inventory = [], isPending, error} = useQuery ({
        queryKey: ["inventory"],
        queryFn: getInventory,
    })

    return {inventory, isPending, error}
}