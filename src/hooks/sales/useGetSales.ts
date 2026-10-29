"use client";

import { useQuery } from "@tanstack/react-query";
import { salesApi } from "@/lib/api/sales";
import { Sale } from "@/types/sales";

export const useGetSales = () => {
  const {
    data: sales = [],
    isPending,
    error,
    refetch,
  } = useQuery<Sale[]>({
    queryKey: ["sales"],
    queryFn: salesApi.getSales,
  });

  return { sales, isPending, error, refetch };
};

