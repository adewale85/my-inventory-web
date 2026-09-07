
"use client"

import CategoryFilters from "@/components/Categories/CategoryFilters"
import CategoryHeader from "@/components/Categories/CategoryHeader"



export default function categoriesHeader () {
    return (
        <div className="space-y-6 p-6">
            <CategoryHeader/>
            <CategoryFilters/>
        </div>
    )
}