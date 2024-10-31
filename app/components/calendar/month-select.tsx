import React from 'react'
import dayjs from '@/app/lib/dayjs'
import { getLastMonthYear, getNextMonthYear } from '@/app/lib/utils'
import { ArrowLeft } from '../icons/arrow-left'
import { ArrowRight } from '../icons/arrow-right'
import { useNewEventStore } from '@/app/lib/zustand/store'

function MonthSelect({ month, year }: { month: number; year: number }) {
 const lastMonth = getLastMonthYear(month, year)
 const nextMonth = getNextMonthYear(month, year)
 const setCurrentMonth = useNewEventStore((state) => state.setCurrentMonth)
 const setCurrentYear = useNewEventStore((state) => state.setCurrentYear)
 const selectedMonth = dayjs()
  .month(month - 1)
  .format('MMMM')
 return (
  <div className='flex items-center justify-center gap-3 text-2xl  mx-auto w-full'>
   <div
    onClick={() => {
     setCurrentMonth(lastMonth.month)
     setCurrentYear(lastMonth.year)
    }}
    className='cursor-pointer '>
    <ArrowLeft className='w-6 h-6' />
   </div>
   <span className='cursor-pointer flex '>{selectedMonth}</span>
   <div
    onClick={() => {
     setCurrentMonth(nextMonth.month)
     setCurrentYear(nextMonth.year)
    }}
    className='cursor-pointer '>
    <ArrowRight className='w-6 h-6' />
   </div>
  </div>
 )
}

export default MonthSelect
