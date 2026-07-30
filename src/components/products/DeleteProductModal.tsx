
import {Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { ProductResponse } from "@/types/product";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";



interface DeleteProductModalProps {
  product: ProductResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteProductModal ({product, open, onOpenChange} : DeleteProductModalProps) {
    
    const {deleteProduct, isPending} = useDeleteProduct()

    const handleDelete = () => {
        if(!product) return;
        
        deleteProduct(product.id, {
            onSuccess: () => {
                onOpenChange(false)
            }
        })
        onOpenChange(false)
    }

    return (
         <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {product?.name}
            </span>
            ?
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}