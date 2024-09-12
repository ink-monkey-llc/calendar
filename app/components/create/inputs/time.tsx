import { cn } from '@/app/lib/utils'
import React from 'react'

type Props = {
 allDay: boolean
 pos: 'start' | 'end'
}

function Time({ allDay, pos }: Props) {
 const attr = pos === 'start' ? { id: 'startTime', label: 'Start time' } : { id: 'endTime', label: 'End time' }

 return (
  <div className={cn(allDay && 'opacity-50')}>
   <label
    htmlFor={attr.id}
    className='block text-sm font-medium text-white'>
    {attr.label}
   </label>
   <input
    disabled={allDay}
    className='bg-transparent border border-white/20 rounded-lg px-1'
    id={attr.id}
    name={attr.id}
    type='time'
   />
  </div>
 )
}

export default Time
