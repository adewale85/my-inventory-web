"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";


export default function CategoryHeader () {
    return (
        <div className="flex items-center justify-between">
            <div>
     <h1 className="text-3xl font-bold tracking-tight">
         Categories
      </h1>

      <p className="text-muted-foreground">
        Manage all inventory categories.
     </p>
      </div>


        <Button>
            <Plus className="mr-2 size-4"/>
            Add Category
        </Button>
     {/* <Button onClick={onAddProduct}>
     <Plus className="mr-2 h-4 w-4" />
     Add Product
     </Button> */}
        </div>
    )
}


// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

// interface ProductsHeaderProps {
//     onAddProduct: () => void
// }

// export default function CategoriesHeader({
//     onAddProduct,
// }: ProductsHeaderProps) {
  
//   return (
//     <div className="flex items-center justify-between">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">
//           Products
//         </h1>

//         <p className="text-muted-foreground">
//           Manage all inventory products.
//         </p>
//       </div>

//       <Button onClick={onAddProduct}>
//       <Plus className="mr-2 h-4 w-4" />
//       Add Product
//     </Button>

//     {/* <AddProductModal open={isOpen} onOpenChange={setIsOpen} /> */}
//     </div>
//   );
// }