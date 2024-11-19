import React from 'react'
import dayjs from '@/app/lib/dayjs'
import { useWindowSize } from 'usehooks-ts'
import { cn, getLastMonthYear, getNextMonthYear } from '@/app/lib/utils'
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

 const { width } = useWindowSize()
 const isMobile = width < 465

 return (
  <div className='relative flex items-center justify-center gap-3 text-2xl  mx-auto w-full'>
   <a
    className={cn('text-xs text-white/60 absolute top-1 left-4 underline hover:text-white', isMobile && 'left-2')}
    href='/privacy'>
    Privacy Policy
   </a>
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
