import { useGetAllSuppliers } from '@/hooks/suppliers/useGetAllSuppliers';
import { SupplierResponse } from '@/types/suppliers'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { mockSuppliers } from '@/mock/suppliers';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { MoreHorizontal, Pencil } from 'lucide-react';
interface SuppliersTableProps {setSupplierToDelete: (supplier: SupplierResponse) => void}

export default function SuppliersTable({ setSupplierToDelete }: SuppliersTableProps) {

    const {suppliers, isPendingSuppliers} = useGetAllSuppliers(); 
    const displaySuppliers = suppliers?.length > 0 ? suppliers : mockSuppliers; 

    if (isPendingSuppliers) {
        return(
             <div className="p-8 text-center text-slate-500">Loading Suppliers...</div>
        )
    }

  return (
    <div>
        <Table>
            <TableHeader>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Contact Name</TableHead>
                <TableHead>Contact Email</TableHead>
                <TableHead>Contact Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="w-20 text-right">Action</TableHead>
            </TableHeader>

            <TableBody>
                {displaySuppliers?.map((supplier) => (
                <TableRow key={supplier.id} className="flex items-center justify-between border-b px-4 py-2">
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.contact_person}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                   <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                        <Button variant="outline" size="sm" onClick={() => setSupplierToDelete(supplier)}>
                            Delete
                        </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

