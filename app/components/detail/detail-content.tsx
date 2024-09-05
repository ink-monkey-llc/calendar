'use client'
import { useState, useEffect } from 'react'
import { CalendarEvent, ColorOption, Day, colorDefault } from '@/types/types'
import { cn } from '@/app/lib/utils'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import dayjs from '@/app/lib/dayjs'
import DayEvent from './day-event'

function DetailContent({ day, events }: { day: Day; events: CalendarEvent[] }) {
 const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
 const [currentColor, setCurrentColor] = useState<ColorOption>(color)

 useEffect(() => {
  setCurrentColor(color)
 }, [color])
 const dayLabel = dayjs(day.date).format('dddd')
 return (
  <div className='z-40 relative pl-2 pr-4 pt-2 '>
   <div
    style={{ color: currentColor.text }}
    className='flex justify-between items-center mr-4 text-2xl h-16 pl-8 pr-6 pt-4 '>
    <span>{dayLabel}</span>
    <span className='text-lg'>{dayjs(day.date).format('MMMM D, YYYY')}</span>
   </div>
   <div className='bg-black mr-3 h-56'>
    {events.map((event, index) => (
     <DayEvent
      key={event.id}
      color={currentColor}
      event={event}
     />
    ))}
   </div>
  </div>
 )
}

export default DetailContent
