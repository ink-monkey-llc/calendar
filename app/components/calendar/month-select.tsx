import React from 'react'
import dayjs from '@/app/lib/dayjs'
import { getLastMonthYear, getNextMonthYear } from '@/app/lib/utils'
import { ArrowLeft } from '../icons/arrow-left'
import { ArrowRight } from '../icons/arrow-right'
import Link from 'next/link'

function MonthSelect({ month, year }: { month: number; year: number }) {
 const lastMonth = getLastMonthYear(month, year)
 const nextMonth = getNextMonthYear(month, year)
 const selectedMonth = dayjs()
  .month(month - 1)
  .format('MMMM')
 return (
  <div className='flex items-center justify-center gap-3 text-2xl  mx-auto w-full'>
   <Link
    href={`/cal?m=${getLastMonthYear(month, year)}`}
    className='cursor-pointer '>
    <ArrowLeft className='w-6 h-6' />
   </Link>
   <span className='cursor-pointer flex '>{selectedMonth}</span>
   <Link
    href={`/cal?m=${getNextMonthYear(month, year)}`}
    className='cursor-pointer '>
    <ArrowRight className='w-6 h-6' />
   </Link>
  </div>
 )
}

export default MonthSelect
