import React, { useState } from 'react'
import { cn } from '@/app/lib/utils'
import { CalendarEvent, ColorOption } from '@/types/types'

import dayjs from '@/app/lib/dayjs'
import { Pin } from '../icons/pin'

function DayEvent({ event, color }: { event: CalendarEvent; color: ColorOption }) {
 const [open, setOpen] = useState(false)
 const isAllDay = !!event.start.date
 const hasLocation = !!event.location
 const startTime = dayjs(event.start.dateTime).format('h:mm a')
 const endTime = dayjs(event.end.dateTime).format('h:mm a')
 const descHtml = { __html: event.description }
 return (
  <div
   onClick={() => setOpen(!open)}
   className='font-semibold p-2 grid grid-cols-3 items-center hover-bg cursor-pointer'
   style={{ color: color.value, '--current': color.ul }}>
   <div className='col-span-1 w-max '>
    {isAllDay && <span className='text-sm'>All day</span>}
    {!isAllDay && (
     <span className='text-sm '>
      {startTime} - {endTime}
     </span>
    )}
   </div>
   <div
    style={{ borderLeftWidth: '1px', borderLeftColor: color.value }}
    className={cn('col-span-2 pl-2 ml-1 flex flex-col gap-1', open ? 'text-wrap' : 'truncate')}>
    <div className='text-sm'>{event.summary}</div>
    {open && (
     <div>
      <div
       dangerouslySetInnerHTML={descHtml}
       className='text-sm text-wrap'
      />
      {hasLocation && (
       <div className='flex justify-between items-center gap-1'>
        <Pin className='min-w-4 min-h-4' />
        <span className='text-xs'>{event.location}</span>
       </div>
      )}
     </div>
    )}
   </div>
  </div>
 )
}

export default DayEvent
