"use client"

import UnitsHeader from '@/components/units/UnitsHeader'
import UnitsFilters from '@/components/units/UnitsFilters'
import UnitsTable from '@/components/units/UnitsTable'

import AddUnitsModal from '@/components/units/AddUnitsModal'
import { useState } from 'react'
import TablePagination from '@/components/Categories/TablePagination'



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
    