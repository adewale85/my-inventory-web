"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddProductModal({
  open,
  onOpenChange,
}: AddProductModalProps) {


  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>

          <DialogDescription>
            Enter the details for the new product.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>

            <Input
              id="name"
              placeholder="e.g. Rice"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">
                Cost Price
              </Label>

              <Input
                id="price"
                type="number"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="stock">
                Reorder Level
              </Label>

              <Input
                id="stock"
                type="number"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button>
            Save Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}