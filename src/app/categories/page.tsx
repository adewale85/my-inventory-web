
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

export default function CategoriesPage() {
  const [openAddCategory, setOpenAddCategory] = useState(false);

  return (
    <div className="space-y-6">
      <CategoryHeader
        onAddCategory={() => setOpenAddCategory(true)}
      />

      <CategoryFilters />

      <CategoryTable />

      <TablePagination />


        <AddCategoryModal
        open={openAddCategory}
        onOpenChange={setOpenAddCategory}
        />
       {/* <AddCategoryModal
        open={openAddCategory}
        onOpenChange={setOpenAddCategory}
      /> */}
    </div>
  );
}



