
"use client"

import CategoryFilters from "@/components/Categories/CategoryFilters"
import CategoryHeader from "@/components/Categories/CategoryHeader"
import CategoryTable from "@/components/Categories/CategoryTable"
import TablePagination from "@/components/Categories/TablePagination"



export default function categoriesHeader () {
    return (
        <div className="space-y-6 p-6">
            <CategoryHeader/>
            <CategoryFilters/>
            <CategoryTable/>
            <TablePagination/>
        </div>
    )
}