import { useGetAllSuppliers } from '@/hooks/suppliers/useGetAllSuppliers';
import { SupplierResponse } from '@/types/suppliers'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

interface SuppliersTableProps {
    setSupplierToDelete: (supplier: SupplierResponse) => void;
    setSupplierToEdit: (supplier: SupplierResponse) => void;
}

export default function SuppliersTable({ setSupplierToDelete, setSupplierToEdit }: SuppliersTableProps) {

    const {suppliers, isPendingSuppliers} = useGetAllSuppliers(); 
    const displaySuppliers = suppliers;
    // const displaySuppliers = suppliers?.length > 0 ? suppliers : mockSuppliers; 

    if (isPendingSuppliers) {
        return(
             <div className="p-8 text-center text-slate-500">Loading Suppliers...</div>
        )
    }

  
return (
  <>
    {/* =========================
        MOBILE SUPPLIER CARDS
    ========================== */}
    <div className="space-y-4 md:hidden">
      {displaySuppliers?.map((supplier) => (
        <div
          key={supplier.id}
          className="rounded-xl border bg-white p-4 shadow-sm"
        >
          {/* Supplier Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate font-semibold text-foreground">
                {supplier.name}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {supplier.contact_person}
              </p>
            </div>

            {/* Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setSupplierToEdit(supplier)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={() => setSupplierToDelete(supplier)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Supplier Details */}
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="mt-1 break-all font-medium">
                {supplier.email}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="mt-1 font-medium">
                {supplier.phone}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Address</p>
              <p className="mt-1 font-medium">
                {supplier.address}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* =========================
        DESKTOP SUPPLIER TABLE
    ========================== */}
    <div className="hidden overflow-x-auto rounded-md border md:block">
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Contact Name</TableHead>
            <TableHead>Contact Email</TableHead>
            <TableHead>Contact Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="w-20 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {displaySuppliers?.map((supplier) => (
            <TableRow key={supplier.id}>
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
                    <DropdownMenuItem
                      onClick={() => setSupplierToEdit(supplier)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => setSupplierToDelete(supplier)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </>

)
}

