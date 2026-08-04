
import { SupplierResponse } from '@/types/suppliers';
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { useDeleteSupplier } from '@/hooks/suppliers/useDeleteSupplier';

interface DeleteSupplierModalProps {
    supplier: SupplierResponse;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteSupplierModal({ supplier, open, onOpenChange } : DeleteSupplierModalProps) {

    const {deleteSupplier, deleteIsPending} = useDeleteSupplier()

    const handleDelete = () => {
        if(!supplier) return;

        deleteSupplier(supplier.id, {
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

    <DialogContent>
        <DialogHeader>
            <DialogTitle>Delete Supplier</DialogTitle>
            <DialogDescription>
                Are you sure you want to delete{" "} 
                <span>
                    {supplier.name}</span> ? <br /> This action cannot be undone.    
            </DialogDescription>
        </DialogHeader>

        <DialogFooter>
            <Button variant="outline" onClick={()=> onOpenChange(false)} disabled= {deleteIsPending}>
            Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteIsPending}>
                {deleteIsPending ? "Deleting..." : "Delete"}
            </Button>
        </DialogFooter>
    </DialogContent>


    </Dialog>
  )
}

