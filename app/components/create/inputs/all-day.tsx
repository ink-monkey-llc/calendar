import React from 'react'
import { CheckIcon } from '../../icons/check'
import { cn } from '@/app/lib/utils'

function AllDay({
 allDay,
 setAllDay,
 setTimes,
}: {
 allDay: boolean
 setAllDay: React.Dispatch<React.SetStateAction<boolean>>
 setTimes: React.Dispatch<React.SetStateAction<{ startTime: string; endTime: string }>>
}) {
 const handleClick = () => {
  if (!allDay) {
   setTimes({ startTime: '', endTime: '' })
  }
  setAllDay(!allDay)
 }

 return (
  <div
   onClick={handleClick}
   className='flex gap-2 items-center mt-auto mb-1 ml-3 cursor-pointer'>
   <input
    checked={allDay}
    onChange={() => setAllDay(allDay)}
    className='hidden'
    name='allDay'
    id='allDay'
    type='checkbox'
   />
   <div className={cn('w-5 h-5 border-2 border-white/70 rounded-md relative ')}>
    <CheckIcon className={cn('w-8 h-8 absolute -top-3 -left-1 opacity-0 transition-all', allDay && 'opacity-100')} />
   </div>
   <label
    htmlFor='allDay'
    className='text-sm  '>
    All day
   </label>
  </div>
 )
}

export default AllDay
