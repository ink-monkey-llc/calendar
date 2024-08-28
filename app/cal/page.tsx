import React from 'react'
import Calendar from '../components/calendar/calendar'
import { splitDateString } from '@/app/lib/utils'
import dayjs from '../lib/dayjs'
import Settings from '../components/settings/settings'
function Cal({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
 const initYear = Number(dayjs().format('YYYY'))
 const initMonth = Number(dayjs().format('M'))
 const { month, year } = searchParams.m ? splitDateString(searchParams.m as string) : { month: initMonth, year: initYear }
 return (
  <div className='calendar-wrapper w-max p-4 flex items-end relative'>
   <Calendar
    month={month}
    year={year}
   />
   <Settings />
  </div>
 )
}

export default Cal
