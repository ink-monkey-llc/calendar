import { cn } from '@/app/lib/utils'
import React from 'react'

type Props = {
 allDay: boolean
 pos: 'start' | 'end'
 setTime: (pos: 'start' | 'end', e: React.ChangeEvent<HTMLInputElement>) => void
 times: { startTime: string; endTime: string }
 setAllDay: React.Dispatch<React.SetStateAction<boolean>>
}

function Time({ allDay, pos, setTime, times, setAllDay }: Props) {
 const attr = pos === 'start' ? { id: 'startTime', label: 'Start time' } : { id: 'endTime', label: 'End time' }
 const value = pos === 'start' ? times.startTime.toString() : times.endTime.toString()

 const handleClick = () => {
  setAllDay(false)
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
    onChange={(e) => setTime(pos, e)}
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
