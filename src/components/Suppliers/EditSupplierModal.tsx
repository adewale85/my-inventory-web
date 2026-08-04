import React from 'react'
import { Dialog } from '../ui/dialog';
import { SupplierResponse } from '@/types/suppliers';

interface EditSupplierModalProps {
  supplier: SupplierResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditSupplierModal({supplier, open, onOpenChange}: EditSupplierModalProps) {
  return (

    <Dialog 
    open={open}
    onOpenChange={onOpenChange}
    >
        <div>
            placeholder for edit supplier modal
        </div>
    </Dialog>
  )
}

