import { Plus } from "lucide-react";
import { Button } from "../ui/button";


export default function UnitsHeader ({onAddUnit}: {onAddUnit: () => void}) {
   return(
    <div className="flex items-center justify-between">
    <div>
        <h1 className="text-3xl font-bold tracking-tight">Units</h1>

         <p className="text-muted-foreground">
          Manage all inventory Units.
        </p>
    </div>

        <Button onClick={onAddUnit}>
            <Plus className="mr-2 h-4 w-4" />
            Add Units
        </Button>

    </div>
   )
}