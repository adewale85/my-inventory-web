
"use client";

import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";
import { useGetAllStockMovements } from "@/hooks/stock-movements/useGetAllStockMovement";

export default function StockMovementHistory() {
  const {
    stockMovements,
    isPending: movementsLoading,
    error,
  } = useGetAllStockMovements();

  const {
    products,
    isPending: productsLoading,
  } = useGetAllProducts();

  if (movementsLoading || productsLoading) {
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

      {/* =========================
          MOBILE CARDS
      ========================== */}
      <div className="space-y-4 md:hidden">
        {stockMovements.map((movement) => {
          const product = products.find(
            (product) => product.id === movement.product_id
          );

          return (
            <div
              key={movement.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              {/* Product + Type */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">
                    {product?.name || "Unknown Product"}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Stock Movement
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    movement.type === "IN"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {movement.type === "IN"
                    ? "Stock In"
                    : "Stock Out"}
                </span>
              </div>

              {/* Movement Details */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">
                    Quantity
                  </p>

                  <p className="mt-1 font-medium">
                    {movement.quantity}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    Date
                  </p>

                  <p className="mt-1 font-medium">
                    {new Date(
                      movement.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Note */}
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Note
                </p>

                <p className="mt-1 text-sm">
                  {movement.note || "-"}
                </p>
              </div>

              {/* Full Time */}
              <p className="mt-3 text-xs text-muted-foreground">
                {new Date(
                  movement.created_at
                ).toLocaleTimeString()}
              </p>
            </div>
          );
        })}
      </div>

      {/* =========================
          DESKTOP TABLE
      ========================== */}
      <div className="hidden overflow-x-auto rounded-lg border md:block">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b bg-slate-50 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Type</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Note</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {stockMovements.map((movement) => {
              const product = products.find(
                (product) => product.id === movement.product_id
              );

              return (
                <tr
                  key={movement.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {product?.name || "Unknown Product"}
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

