import { CalendarEvent, ColorOption } from '@/types/types'
import React from 'react'
import dayjs from '@/app/lib/dayjs'

function DayEvent({ event, color }: { event: CalendarEvent; color: ColorOption }) {
 const isAllDay = !!event.start.date
 const startTime = dayjs(event.start.dateTime).format('h:mm a')
 const endTime = dayjs(event.end.dateTime).format('h:mm a')
 return (
  <div
   className='font-semibold p-2 grid grid-cols-3'
   style={{ color: color.value }}>
   <div className='col-span-1'>
    {isAllDay && <span>All day</span>}
    {!isAllDay && (
     <span className='text-sm w-max'>
      {startTime} - {endTime}
     </span>
    )}
   </div>
   <div
    style={{ borderLeftWidth: '1px', borderLeftColor: color.value }}
    className='text-sm col-span-2 pl-1'>
    {event.summary}
   </div>
  </div>
 )
}

export default DayEvent
