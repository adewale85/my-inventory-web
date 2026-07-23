"use client";

import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";

export default function ProductsPage() {
  const {products,isPending,isError,error,
  } = useGetAllProducts();

  const { deleteProduct, isPending: isDeleting } = useDeleteProduct();
  
  console.log(products); 

  if (isPending) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading inventory...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Products Inventory
        </h1>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border rounded-lg p-4"
          >
            <div>
              <h2 className="font-semibold">
                {product.name}
              </h2>

              <p className="text-sm text-gray-500">
                SKU: {product.sku ?? "N/A"}
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <span>{product.description}</span>

              <button
                onClick={() => deleteProduct(product.id)}
                disabled={isDeleting}
                className="text-red-600"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}