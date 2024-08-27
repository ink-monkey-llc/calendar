import React from 'react'
import type { Day, CalendarEvent } from '@/types/types'
import { cn } from '@/app/lib/utils'
import dayjs from '@/app/lib/dayjs'

type Props = {
 day: Day
 index: number
 events: CalendarEvent[]
}

function Day({ day, index, events }: Props) {
 const eventsForDay = events?.filter((event) => event.start.date?.includes(day.date) || event.start.dateTime?.includes(day.date))
 const isToday = dayjs().format('YYYY-MM-DD') === day.date
 return (
  <div className={cn('aspect-square w-full border border-gray-300', day.isCurrentMonth ? 'bg-blue-900' : 'bg-gray-800', isToday && 'bg-blue-600')}>
   <li
    className=' text-end pr-[5px]'
    key={index}>
    {day.day}
    {eventsForDay?.length > 0 &&
     eventsForDay.map((event) => (
      <div
       key={event.id}
       className='text-xs'>
       {event.summary}
      </div>
     ))}
   </li>
  </div>
 )
}

export default Day

// calendar-days
