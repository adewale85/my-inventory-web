
import { useCreateUnit } from '@/hooks/units/useCreateUnit';
import { UnitFormValues, unitSchema } from '@/schemas/unitSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog';
import UnitForm from './UnitForm';
import { Button } from '../ui/button';


interface AddUnitsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


export default function AddUnitsModal({open, onOpenChange} : AddUnitsModalProps) {
    const form = useForm<UnitFormValues>({
        resolver: zodResolver(unitSchema),
        defaultValues: {
            name: "",
            abbreviation: "",
        },
    });

   const {createUnits, isUnitPending} = useCreateUnit();
 
    const onSubmit = (data: UnitFormValues) => {
        createUnits(data, {
            onSuccess: () => {
                toast.success("Unit created successfully");
                form.reset();
                onOpenChange(false);
            },
            onError: (error) => {
                toast.error(error.message || "Failed to create unit.");
            },
        });
    };

   


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <UnitForm form={form}/>

            <DialogFooter>
                <Button type='submit' disabled={isUnitPending}>
                    {isUnitPending ? "Creating..." : "Create Unit"}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  );
}

