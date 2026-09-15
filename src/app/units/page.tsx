"use client"

import UnitsHeader from '@/components/units/UnitsHeader'
import UnitsFilters from '@/components/units/UnitsFilters'
import UnitsTable from '@/components/units/UnitsTable'
import TablePagination from '@/components/products/TablePagination'
import AddUnitsModal from '@/components/units/AddUnitsModal'
import { useState } from 'react'



export default function  units() {

    const [onAddUnit, setOpenAddUnit] = useState (false)

  return (
    <div className='space-y-5'>
        <UnitsHeader onAddUnit={() => setOpenAddUnit(true)}/>
        <UnitsFilters/>
        <UnitsTable/>

        <TablePagination/>

        <AddUnitsModal 
         open = {onAddUnit}
         onOpenChange = {setOpenAddUnit}
         />
    </div>
  )
}
    