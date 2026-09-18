// "use client";

// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
// import { Badge } from "../ui/badge";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import { Button } from "../ui/button";
// import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
// import { ProductResponse } from "@/types/product";
// import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";

// interface ProductTableProps {
//   setProductToDelete: (product: ProductResponse) => void;
// }

// export default function ProductTable({ setProductToDelete }: ProductTableProps) {
//   const { products, isPending } = useGetAllProducts();
  
//   // Uses live Supabase data if available and populated, otherwise falls back to mock data
// //   const displayProducts = products && products.length > 0 ? products : mockProducts;
   
//   if (isPending) {
//     return (
//       <div className="p-8 text-center text-slate-500">
//         Loading inventory...
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Product</TableHead>
//             <TableHead>SKU</TableHead>
//             <TableHead>Category</TableHead>
//             <TableHead>Reorder Level</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="w-20 text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {products?.map((product) => (
//             <TableRow key={product.id}>
//               {/* Product Name & Description */}
//               <TableCell className="font-medium">
//                 <div>
//                   <h2 className="font-semibold text-foreground">{product.name}</h2>
//                   <p className="text-sm text-muted-foreground">{product.description || "No description"}</p>
//                 </div>
//               </TableCell>

//               {/* SKU */}
//               <TableCell>{product.sku}</TableCell>

//               {/* Category (mapped correctly to Supabase join relation) */}
//               <TableCell>{product.categories?.name || "Uncategorized"}</TableCell>

//               {/* Reorder Level */}
//               <TableCell>{product.reorder_level ?? 0}</TableCell>

//               {/* Status */}
//               <TableCell>
//                 <Badge variant={product.is_active ? "default" : "secondary"}>
//                   {product.is_active ? "Active" : "Inactive"}
//                 </Badge>
//               </TableCell>

//               {/* Action Dropdown */}
//               <TableCell className="text-right">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreHorizontal className="h-4 w-4"/>
//                     </Button>
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent align="end">
//                     <DropdownMenuItem>
//                       <Pencil className="mr-2 h-4 w-4" />
//                       Edit
//                     </DropdownMenuItem>
//                     <DropdownMenuItem 
//                       className="text-red-600 focus:text-red-600"
//                       onClick={() => setProductToDelete(product)}
//                     >
//                       <Trash2 className="mr-2 h-4 w-4" />
//                       Delete
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }




"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { ProductResponse } from "@/types/product";
import { useGetAllProducts } from "@/hooks/products/useGetAllProduct";

interface ProductTableProps {
  setProductToDelete: (product: ProductResponse) => void;
  setProductToEdit: (product: ProductResponse) => void;
}

export default function ProductTable({
  setProductToDelete,
  setProductToEdit,
}: ProductTableProps) {
  const { products, isPending } = useGetAllProducts();

  if (isPending) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading products...
      </div>
    );
  }


return (
  <>
    {/* =========================
        MOBILE PRODUCT CARDS
    ========================== */}
    <div className="space-y-4 md:hidden">
      {products?.map((product) => (
        <div
          key={product.id}
          className="rounded-xl border bg-white p-4 shadow-sm"
        >
          {/* Product Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate font-semibold text-foreground">
                {product.name}
              </h2>

              <p className="mt-1 truncate text-sm text-muted-foreground">
                {product.description || "No description"}
              </p>
            </div>

            {/* Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setProductToEdit(product)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={() => setProductToDelete(product)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Product Details */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">SKU</p>
              <p className="mt-1 font-medium">{product.sku}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Category</p>
              <p className="mt-1 font-medium">
                {product.categories?.name || "Uncategorized"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Reorder Level</p>
              <p className="mt-1 font-medium">
                {product.reorder_level ?? 0}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Status</p>
              <div className="mt-1">
                <Badge
                  variant={product.is_active ? "default" : "secondary"}
                >
                  {product.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* =========================
        DESKTOP PRODUCT TABLE
    ========================== */}
    <div className="hidden rounded-md border md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Reorder Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-20 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              {/* Product Name & Description */}
              <TableCell className="font-medium">
                <div>
                  <h2 className="font-semibold text-foreground">
                    {product.name}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {product.description || "No description"}
                  </p>
                </div>
              </TableCell>

              {/* SKU */}
              <TableCell>{product.sku}</TableCell>

              {/* Category */}
              <TableCell>
                {product.categories?.name || "Uncategorized"}
              </TableCell>

              {/* Reorder Level */}
              <TableCell>{product.reorder_level ?? 0}</TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant={product.is_active ? "default" : "secondary"}
                >
                  {product.is_active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setProductToEdit(product)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => setProductToDelete(product)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </>
);



}