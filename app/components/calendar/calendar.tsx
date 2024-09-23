'use client'
import React from 'react'
import MonthSelect from './month-select'
import Days from './days'

function Calendar({ month, year }: { month: number; year: number }) {
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
