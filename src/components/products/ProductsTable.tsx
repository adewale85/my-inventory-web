"use client"
import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";
// 1. Import TableRow and TableCell
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { mockProducts } from "@/mock/products";
import { ProductResponse } from "@/types/product";


// const [productToDelete, setProductToDelete] = useState <ProductResponse | null>(null);
interface ProductTableProps {
  setProductToDelete: (
    product: ProductResponse
  ) => void;
}
export default function ProductTable ({setProductToDelete, setProductToEdit}
    : ProductTableProps) {

    const {products, isPending, isError, error} = useGetAllProducts();
    const displayProducts = products?.length > 0 ? products : mockProducts;

    if (isPending) {
        return(
            <div className="p-8 text-center text-slate-500">
                Loading inventory...
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px] text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {displayProducts.map((product) => (
                        // 2. Wrap each row in <TableRow>
                        <TableRow key={product.id}>
                            {/* Product Name & Description */}
                            <TableCell className="font-medium">
                                <div>
                                    <h2 className="font-semibold text-foreground">{product.name}</h2>
                                    <p className="text-sm text-muted-foreground">{product.description || "No description"}</p>
                                </div>
                            </TableCell>

                            {/* SKU */}
                            <TableCell>{product.sku}</TableCell>

                            {/* Category */}
                            <TableCell>{product.category?.name}</TableCell>

                            {/* Quantity */}
                            <TableCell>{product.stock_level?.quantity_on_hand ?? 0}</TableCell>

                            {/* Status */}
                            <TableCell>
                                <Badge variant={product.is_active ? "default" : "secondary"}>
                                    {product.is_active ? "Active" : "Inactive"}
                                </Badge>
                            </TableCell>

                            {/* Action Dropdown */}
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4"/>
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={()=>setProductToEdit(product)}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600 focus:text-red-600"
                                        onClick={()=> setProductToDelete(product)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}