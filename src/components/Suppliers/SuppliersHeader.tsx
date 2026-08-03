import { Plus } from "lucide-react";
import { Button } from "../ui/button";


export default function SuppliersHeader ({onAddSupplier}: {onAddSupplier: () => void}) {
   return(
    <div className="flex items-center justify-between">
    <div>
        <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>

         <p className="text-muted-foreground">
          Manage all inventory Suppliers.
        </p>
    </div>

        <Button onClick={onAddSupplier}>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
        </Button>

    </div>
   )
}