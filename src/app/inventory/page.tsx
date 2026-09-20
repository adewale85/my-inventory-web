"use client";

import { useGetInventory } from "@/hooks/inventory/useGetInventory";
import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";

export default function InventoryPage() {
  const {
    inventory,
    isPending: inventoryLoading,
    error,
  } = useGetInventory();

  const {
    products,
    isPending: productsLoading,
  } = useGetAllProducts();

  if (inventoryLoading || productsLoading) {
    return <p>Loading inventory...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Failed to load inventory.
      </p>
    );
  }

  return (
    <div className=" space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Inventory
        </h1>

        <p className="text-sm text-muted-foreground sm:text-base">
          View current stock levels and inventory status.
        </p>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-4 md:hidden">
        {inventory.map((item) => {
          const product = products.find(
            (product) => product.id === item.product_id
          );

          const quantity = Number(item.quantity);
          const reorderLevel = Number(product?.reorder_level ?? 0);

          const isLowStock = quantity < reorderLevel;

          return (
            <div
              key={item.id}
              className="rounded-lg border bg-white p-4 shadow-sm"
            >
              {/* Product */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate font-semibold">
                    {product?.name || "Unknown Product"}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    SKU: {product?.sku || "-"}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    isLowStock
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {isLowStock ? "Low Stock" : "In Stock"}
                </span>
              </div>

              {/* Inventory Details */}
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Quantity
                  </p>
                  <p className="font-medium">
                    {quantity}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Reorder Level
                  </p>
                  <p className="font-medium">
                    {reorderLevel}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden overflow-x-auto rounded-lg border md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Reorder Level</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => {
              const product = products.find(
                (product) => product.id === item.product_id
              );

              const quantity = Number(item.quantity);
              const reorderLevel = Number(
                product?.reorder_level ?? 0
              );

              const isLowStock = quantity < reorderLevel;

              return (
                <tr key={item.id} className="border-b">
                  <td className="p-3">
                    {product?.name || "Unknown Product"}
                  </td>

                  <td className="p-3">
                    {product?.sku || "-"}
                  </td>

                  <td className="p-3">
                    {quantity}
                  </td>

                  <td className="p-3">
                    {reorderLevel}
                  </td>

                  <td className="p-3">
                    {isLowStock ? "Low Stock" : "In Stock"}
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