import React from 'react'
import { days } from '../../lib/date-utils'
import { getLastMonthYear, getNextMonthYear } from '@/app/lib/utils'
import { getGoogleCalendarEvents } from '@/app/lib/calendar'
import type { CalendarEvent } from '@/types/types'
import { auth } from '@/auth'
import Day from './day'
import dayjs from '@/app/lib/dayjs'
import Link from 'next/link'

async function Calendar({ month, year }: { month: number; year: number }) {
 const session = await auth()
 const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

 if (!session || !session.accessToken || !session.refreshToken) {
  return <div>Sign in to access your calendar</div>
 }

 const events = await getGoogleCalendarEvents(session.accessToken, session.refreshToken)
 const selectedMonth = dayjs()
  .month(month - 1)
  .format('MMMM')
 const today = dayjs().format('MMMM D, YYYY')

 return (
  <div className='relative bg-gray-800 border border-gray-800 max-w-[1000px] m-auto'>
   <section className='flex justify-between p-2 bg-gray-900'>
    <div className='flex items-center justify-between gap-3 text-2xl '>
     <Link
      href={`/cal?m=${getLastMonthYear(month, year)}`}
      className='cursor-pointer '>{`<`}</Link>
     <span className='cursor-pointer flex '>{selectedMonth}</span>
     <Link
      href={`/cal?m=${getNextMonthYear(month, year)}`}
      className='cursor-pointer '>{`>`}</Link>
    </div>
    <div className=''>Today: {today}</div>
   </section>
   <ul className='text-lg bg-gray-600 pb-[5px] pt-[10px] grid grid-cols-7 gap-x-1'>
    {weekdays.map((day: string, index) => (
     <li
      className='text-end pr-[5px]'
      key={index}>
      {day}
     </li>
    ))}
   </ul>
   <ul className='grid grid-cols-7 relative h-full gap-[1px] border-t-black'>
    {days(year, month).map((day, index) => (
     <Day
      events={events as CalendarEvent[]}
      key={index}
      day={day}
      index={index}
     />
    ))}
   </ul>
  </div>
 )
}

export default Calendar
