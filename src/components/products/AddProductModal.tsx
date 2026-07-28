import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function AddProductModal () {
    return (
       <Dialog>
        <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4"/>
            Add product
        </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add New Produc</DialogTitle>
                <DialogDescription>
                    Enter the details for the new product here. Click save when you're done
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" placeholder="e.g. Silk Evening Dress" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" type="number" placeholder="10" />
            </div>
          </div>
        </div>
        <DialogFooter>
            <Button type="submit">Save Product</Button>
        </DialogFooter>
        </DialogContent>
       </Dialog>
    )
}