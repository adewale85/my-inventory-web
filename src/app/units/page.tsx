"use client"

import UnitsHeader from '@/components/units/UnitsHeader'
import UnitsFilters from '@/components/units/UnitsFilters'
import UnitsTable from '@/components/units/UnitsTable'

export default function  units() {
  return (
    <div className='space-y-5'>
        <UnitsHeader/>
        <UnitsFilters/>
        <UnitsTable/>
    </div>
  )
}
    