import React from 'react'
import { days } from '../../lib/date-utils'
import { getGoogleCalendarEvents } from '@/app/lib/calendar'
import { auth } from '@/app/lib/auth'
import Day from './day'

async function Calendar() {
 const session = await auth()
 const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
 if (!session || !session.accessToken) {
  return <div>Sign in to access your calendar</div>
 }
 const events = await getGoogleCalendarEvents(session.accessToken)
 return (
  <div className='relative bg-gray-800 border border-gray-800'>
   <section className='flex justify-between p-2 bg-gray-900'>
    <div className='text-lg font-semibold'>Selected Month</div>
    <div className='flex items-center justify-between w-20 '>
     <span className='cursor-pointer'>{`<`}</span>
     <span className='cursor-pointer'>Today</span>
     <span className='cursor-pointer'>{`>`}</span>
    </div>
   </section>
   <ul className='text-lg bg-gray-600 pb-[5px] pt-[10px] grid grid-cols-7 gap-x-1'>
    {weekdays.map((day, index) => (
     <li
      className='text-end pr-[5px]'
      key={index}>
      {day}
     </li>
    ))}
   </ul>
   <ul className='grid grid-cols-7 relative h-full gap-[1px] border-t-black'>
    {days.map((day, index) => (
     <Day
      events={events}
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
