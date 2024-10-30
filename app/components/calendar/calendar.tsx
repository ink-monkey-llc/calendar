'use client'
import React, { Suspense } from 'react'
import MonthSelect from './month-select'
import dynamic from 'next/dynamic'
// import Days from './days'

function Calendar({ month, year }: { month: number; year: number }) {
 const Days = dynamic(() => import('./days'), { ssr: false })
 return (
  <div className='w-full max-w-[1200px] mx-auto'>
   <MonthSelect
    month={month}
    year={year}
   />

   <Days
    year={year}
    month={month}
   />
  </div>
 )
}

export default Calendar
