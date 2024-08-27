import React from 'react'
import Calendar from '../components/calendar/calendar'
import { splitDateString } from '@/app/lib/utils'
import dayjs from '../lib/dayjs'
function Cal({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
 const initYear = Number(dayjs().format('YYYY'))
 const initMonth = Number(dayjs().format('M'))
 const { month, year } = searchParams.m ? splitDateString(searchParams.m as string) : { month: initMonth, year: initYear }
 return (
  <div className='flex justify-center items-center m-8'>
   <Calendar
    month={month}
    year={year}
   />
  </div>
 )
}

export default Cal
