"use client";

import { useGetAllStockMovements } from "@/hooks/stock-movements/useGetAllStockMovement";


export default function StockMovementHistory() {
  const {
    stockMovements,
    isPending,
    error,
  } = useGetAllStockMovements();

  if (isPending) {
    return <p>Loading stock movements...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Failed to load stock movements.
      </p>
    );
  }

  if (stockMovements.length === 0) {
    return <p>No stock movements yet.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">
        Stock Movement History
      </h2>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50 text-left">
              <th className="p-3">Product ID</th>
              <th className="p-3">Type</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Note</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {stockMovements.map((movement) => (
              <tr key={movement.id} className="border-b">
                <td className="p-3">
                  {movement.product_id}
                </td>

                <td className="p-3">
                  {movement.type}
                </td>

                <td className="p-3">
                  {movement.quantity}
                </td>

                <td className="p-3">
                  {movement.note || "-"}
                </td>

                <td className="p-3">
                  {new Date(
                    movement.created_at
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}