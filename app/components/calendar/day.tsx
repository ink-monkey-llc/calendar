import React from 'react'
import type { Day, CalendarEvent } from '@/types/types'
import { cn } from '@/app/lib/utils'

type Props = {
 day: Day
 index: number
 events: CalendarEvent[]
}

function Day({ day, index, events }: Props) {
 const eventsForDay = events.filter((event) => event.start.dateTime?.includes(day.date))
 return (
  <div className={cn('aspect-square w-full border border-x-gray-300', day.isCurrentMonth ? 'bg-blue-900' : 'bg-gray-800')}>
   <li
    className=' text-end pr-[5px]'
    key={index}>
    {day.day}
    {eventsForDay.length > 0 && <div className='text-xs'>{eventsForDay.length}</div>}
   </li>
  </div>
 )
}

export default Day

// calendar-days
