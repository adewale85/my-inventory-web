"use client";

import { useState } from "react";


import ProductFilters from "@/components/products/ProductFilters";

import TablePagination from "@/components/products/TablePagination";
import AddProductModal from "@/components/products/AddProductModal";
import ProductsHeader from "@/components/products/productsHeader";
import ProductTable from "@/components/products/ProductsTable";
import { ProductResponse } from "@/types/product";
import DeleteProductModal from "@/components/products/DeleteProductModal";

export default function ProductsPage() {

  const [openAddModal, setOpenAddModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState <ProductResponse | null> (null);
  const [productToEdit, setProductToEdit] = useState <ProductResponse | null> (null) 

  return ( 
    <div className="space-y-6 p-6">
      
      <ProductsHeader
        onAddProduct={() =>
          setOpenAddModal(true)
        }
      />

      <ProductFilters />

      <ProductTable 
      setProductToDelete={setProductToDelete}
      // setProductToEdit={setProductToEdit}
      
       />

      <TablePagination />

      <AddProductModal
        open={openAddModal}
        onOpenChange={setOpenAddModal}
      />
 
      <DeleteProductModal
      product={productToDelete}
      open={!!productToDelete}
      onOpenChange={(open) => {
      if (!open) {
      setProductToDelete(null);
    }
  }}
/>

    </div>
  );
}