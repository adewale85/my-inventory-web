"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { salesApi } from "@/lib/api/sales";
import { ProcessSalePayload } from "@/types/sales";

export const useProcessSale = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: processSaleAsync,
    mutate: processSale,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: ProcessSalePayload) => salesApi.processSale(payload),
    onSuccess: () => {
      // Refresh inventory, product list, sales history, stock movements, and dashboard metrics
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["stock-movements"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return {
    processSaleAsync,
    processSale,
    isPending,
    error,
    isSuccess,
  };
};

