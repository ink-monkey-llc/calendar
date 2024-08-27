import React from 'react'
import type { Day, CalendarEvent } from '@/types/types'
import { cn } from '@/app/lib/utils'
import dayjs from '@/app/lib/dayjs'
import { trunc } from '@/app/lib/utils'

type Props = {
 day: Day
 index: number
 events: CalendarEvent[]
}

function Day({ day, index, events }: Props) {
 const eventsForDay = events?.filter((event) => event.start.date?.includes(day.date) || event.start.dateTime?.includes(day.date))
 const isToday = dayjs().format('YYYY-MM-DD') === day.date
 const dayLabel = trunc(dayjs(day.date).format('dddd'))
 return (
  <div className='relative day-bg '>
   <div className='absolute bg-black rounded-xl top-2 right-2 left-[3px] bottom-[3px] z-0'></div>
   <div className='aspect-square relative rounded-lg z-10'>
    <li
     className='text-end p-2 pl-[7px]'
     key={index}>
     <div className='text-[.5rem] flex justify-between pr-[4px] pt-1'>
      <div className='flex justify-center bg-green-600 text-white rounded-[4px] py-0.5 h-max w-10'>{dayLabel}</div>
      <div className='flex justify-center  bg-green-600 text-white text-lg rounded-[4px] w-[29px]'>{day.day}</div>
     </div>
     {eventsForDay?.length > 0 &&
      eventsForDay.map((event) => (
       <div
        key={event.id}
        className='text-[.5rem] truncate '>
        {event.summary}
       </div>
      ))}
    </li>
   </div>
  </div>
 )
}

export default Day

// calendar-days
