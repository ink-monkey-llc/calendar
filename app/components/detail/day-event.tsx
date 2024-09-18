import React, { useState } from 'react'
import { cn } from '@/app/lib/utils'
import { CalendarEvent, ColorOption } from '@/types/types'
import { More } from '../icons/more'
import dayjs from '@/app/lib/dayjs'
import { Pin } from '../icons/pin'
import { Less } from '../icons/less'
import DeleteEvent from './delete-event'
import EditEvent from './edit-event'
import EditDialog from '../edit/edit-dialog'

function DayEvent({ event, color }: { event: CalendarEvent; color: ColorOption }) {
 const [open, setOpen] = useState(false)
 const isAllDay = !!event.start.date
 const hasLocation = !!event.location
 const startTime = dayjs(event.start.dateTime).format('h:mm a')
 const endTime = dayjs(event.end.dateTime).format('h:mm a')
 const descHtml = { __html: event.description }
 const hasDesc = !!event.description
 return (
  <div
   onClick={() => setOpen(!open)}
   className='relative font-semibold p-1 grid grid-cols-4 items-center hover-bg cursor-pointer'
   style={{ color: color.value, '--current': color.ul, borderBottomWidth: '1px', borderBottomColor: color.ul }}>
   <div className='col-span-1 w-max m-auto'>
    {isAllDay && <span className='text-sm'>All day</span>}
    {!isAllDay && (
     <div className='text-sm flex flex-col '>
      <span>{startTime} - </span>
      {endTime}
     </div>
    )}
   </div>
   <div
    style={{ borderInlineWidth: '1px', borderInlineColor: color.value }}
    className={cn('col-span-3 px-2 m-1 flex flex-col gap-1', open ? 'text-wrap' : 'truncate')}>
    {open && (
     <div className='w-full flex justify-end text-sm '>
      <EditDialog />
      <DeleteEvent eventId={event.id} />
     </div>
    )}
    <div className={cn('text-sm font-bold w-full overflow-hidden truncate', open && 'text-wrap')}>{event.summary}</div>
    {open && (
     <div>
      <div
       style={{ backgroundColor: color.ul }}
       dangerouslySetInnerHTML={descHtml}
       className='text-sm text-wrap px-1 rounded-md mb-1'
      />
      {hasLocation && (
       <div className='flex justify-between items-center gap-2'>
        <Pin className='min-w-4 min-h-4' />
        <span className='text-xs'>{event.location}</span>
       </div>
      )}
      <div
       style={{ backgroundColor: color.ul }}
       className='text-xs px-1 rounded-md mt-1'>
       Event creator: {event.creator.email}
      </div>
     </div>
    )}
    {(hasDesc || hasLocation) && (
     <div
      style={{ backgroundColor: color.ul }}
      className='flex justify-center items-center gap-1 text-[.7rem] rounded-md '>
      {open ? (
       <>
        Less
        <Less className='w-4 h-4' />
       </>
      ) : (
       <>
        More
        <More className='w-4 h-4' />
       </>
      )}
     </div>
    )}
   </div>
  </div>
 )
}

export default DayEvent
