
// "use client"

// import CategoryFilters from "@/components/Categories/CategoryFilters"
// import CategoryHeader from "@/components/Categories/CategoryHeader"
// import CategoryTable from "@/components/Categories/CategoryTable"
// import TablePagination from "@/components/Categories/TablePagination"
// import { useState } from "react"



// export default function categoriesPage () {

//     const [openAddCategory, setOpenAddCategory] = useState(false)

//     return (
//         <div className="space-y-6 p-6">
//             <CategoryHeader onAddCategory ={() => setOpenAddCategory(true)}/>
//             <CategoryFilters/>
//             <CategoryTable/>
//             <TablePagination/>
//         </div>
//     )
// }




"use client";

import { useState } from "react";

import CategoryFilters from "@/components/Categories/CategoryFilters";
import CategoryHeader from "@/components/Categories/CategoryHeader";
import CategoryTable from "@/components/Categories/CategoryTable";
import TablePagination from "@/components/Categories/TablePagination";
import AddCategoryModal from "@/components/Categories/AddCategoryModal";
import { CategoryResponse } from "@/types/categories";
import DeleteCategoryModal from "@/components/Categories/DeleteCategoryModal";
import EditCategoryModal from "@/components/Categories/EditCategoryModal";


export default function CategoriesPage() {
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryResponse | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryResponse | null>(null);

  return (
    <div className="space-y-6">
      <CategoryHeader
        onAddCategory={() => setOpenAddCategory(true)}
      />

      <CategoryFilters />

      <CategoryTable 
        setCategoryToDelete={setCategoryToDelete}
        setCategoryToEdit={setCategoryToEdit}
      />

      <TablePagination />

      <AddCategoryModal
        open={openAddCategory}
        onOpenChange={setOpenAddCategory}
      />

      <DeleteCategoryModal
        category={categoryToDelete}
        open={!!categoryToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setCategoryToDelete(null);
          }
        }}
      />

      <EditCategoryModal
        category={categoryToEdit}
        open={!!categoryToEdit}
        onOpenChange={(open) => {
          if (!open) {
            setCategoryToEdit(null);
          }
        }}
      />

    </div>
  );
}

