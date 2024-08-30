import React from 'react'
import Calendar from '../components/calendar/calendar'
import { splitDateString } from '@/app/lib/utils'
import dayjs from '../lib/dayjs'
import Settings from '../components/settings/settings'
import Colors from '../components/settings/colors'
function Cal({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
 const initYear = Number(dayjs().format('YYYY'))
 const initMonth = Number(dayjs().format('M'))
 const { month, year } = searchParams.m ? splitDateString(searchParams.m as string) : { month: initMonth, year: initYear }
 return (
  <div className='relative calendar-wrapper w-max p-4 flex items-end '>
   <Calendar
    month={month}
    year={year}
   />
   <div className='absolute right-4 bottom-4'>
    <Colors />
   </div>
  </div>
 )
}

export default Cal
