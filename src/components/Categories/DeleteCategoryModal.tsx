

import { Button } from "../ui/button";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";
import { CategoryResponse } from "@/types/categories";




interface DeleteCategoryModalProps {
  category: CategoryResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteCategoryModal ({category, open, onOpenChange} : DeleteCategoryModalProps) {
    
    const {deleteCategory, isPending} = useDeleteCategory()

    const handleDelete = () => {
        if (!category) return;
        
        deleteCategory(category.id, {
            onSuccess: () => {
                onOpenChange(false);
            }
        });
    };

    return (
         <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {category?.name}
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