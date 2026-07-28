"use client"
import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";

export default function ProductTable () {

    const {products, isPending, isError, error} = useGetAllProducts();

    const {deleteProduct, isPending: isDeleting} = useDeleteProduct()

    if (isPending) {
        return(
            <div className="p-8 text-center text-slate-500">
                Loading inventory...
            </div>
        )
    }

    if (isError) {
        return(
            <div className="p-8 text-red-600">
                Error: {(error as Error).message}
            </div>
        )
    }

    return (
        <div>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-17.5 text-right">Action</TableHead>
                </TableRow>
                </TableHeader>

                <TableBody>
                    <div>
                        {products.map((product)=>(
                            <div key={product.id} className="flex justify-between items-center border rounded-lg p-4">
                                <div>
                                    <h2 className="font-semibold"> {product.name}</h2>
                                    <p className="text-sm text-gray-500">{product.sku}</p>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <span>{product.description}</span>
                                    
                                    <button onClick={()=>deleteProduct(product.id)}
                                    disabled= {isDeleting}
                                    className="text-red-600">
                                    
                                    {isDeleting ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </TableBody>
            </Table>
        </div>
    )
}