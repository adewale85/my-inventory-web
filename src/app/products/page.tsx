"use client";

import { useState } from "react";


import ProductFilters from "@/components/products/ProductFilters";

import TablePagination from "@/components/products/TablePagination";
import AddProductModal from "@/components/products/AddProductModal";
import ProductsHeader from "@/components/products/productsHeader";
import ProductTable from "@/components/products/ProductsTable";

export default function ProductsPage() {

  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <div className="space-y-6 p-6">
      
      <ProductsHeader
        onAddProduct={() =>
          setOpenAddModal(true)
        }
      />

      <ProductFilters />

      <ProductTable />

      <TablePagination />

      <AddProductModal
        open={openAddModal}
        onOpenChange={setOpenAddModal}
      />

    </div>
  );
}