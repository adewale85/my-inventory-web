"use client";

import { useState } from "react";


import ProductFilters from "@/components/products/ProductFilters";


import AddProductModal from "@/components/products/AddProductModal";
import ProductsHeader from "@/components/products/productsHeader";
import ProductTable from "@/components/products/ProductsTable";
import { ProductResponse } from "@/types/product";
import DeleteProductModal from "@/components/products/DeleteProductModal";
import EditProductModal from "@/components/products/EditProductModal";
import TablePagination from "@/components/Categories/TablePagination";

export default function ProductsPage() {

  const [openAddModal, setOpenAddModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState <ProductResponse | null> (null);
  const [productToEdit, setProductToEdit] = useState <ProductResponse | null> (null) 

  return ( 
    <div className="mx-auto w-full max-w-[1200px] space-y-6 ">
      
      <ProductsHeader
        onAddProduct={() =>
          setOpenAddModal(true)
        }
      />

      <ProductFilters />

       <div className="min-w-0">
      <ProductTable 
      setProductToDelete={setProductToDelete}
      setProductToEdit={setProductToEdit}
      
       />
       </div> 

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

      <EditProductModal
      product={productToEdit}
      open={!!productToEdit}
      onOpenChange={(open) => {
      if (!open) {
      setProductToEdit(null);
    }
  }}
/>

    </div>
  );
}