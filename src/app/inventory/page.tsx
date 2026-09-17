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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">
          View current stock levels and inventory status.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border">
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
              const reorderLevel = Number(product?.reorder_level ?? 0);

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