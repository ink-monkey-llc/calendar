import { cn } from '@/app/lib/utils'
import React from 'react'
import { useNewEventStore } from '@/app/lib/zustand/store'

type Props = {
 pos: 'start' | 'end'
}

function Time({ pos }: Props) {
 const allDay = useNewEventStore((state) => state.allDay)
 const startTime = useNewEventStore((state) => state.startTime)
 const endTime = useNewEventStore((state) => state.endTime)
 const setStartTime = useNewEventStore((state) => state.setStartTime)
 const setEndTime = useNewEventStore((state) => state.setEndTime)
 const setAllDay = useNewEventStore((state) => state.setAllDay)

 const attr = pos === 'start' ? { id: 'startTime', label: 'Start time' } : { id: 'endTime', label: 'End time' }
 const value = pos === 'start' ? startTime.toString() : endTime.toString()

 const handleClick = () => {
  setAllDay(false)
 }

 const handleChangeTime = (pos: 'start' | 'end', e: React.ChangeEvent<HTMLInputElement>) => {
  if (pos === 'start') {
   setStartTime(e.target.value)
  } else {
   setEndTime(e.target.value)
  }
 }

 return (
  <div
   className={cn(allDay && 'opacity-50')}
   onClick={handleClick}>
   <label
    htmlFor={attr.id}
    className='block text-sm font-medium text-white'>
    {attr.label}
   </label>
   <input
    onChange={(e) => handleChangeTime(pos, e)}
    className={cn('bg-transparent border border-white/20 rounded-lg px-1')}
    id={attr.id}
    value={value}
    name={attr.id}
    type='time'
   />
  </div>
 )
}

export default Time
