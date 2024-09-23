'use client'
import { useState, useEffect } from 'react'
import { CalendarEvent, ColorOption, Day, FormattedWeather, colorDefault } from '@/types/types'
import { cn } from '@/app/lib/utils'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import dayjs from '@/app/lib/dayjs'
import DayEvent from './day-event'
import { Raindrop } from '../icons/raindrop'
import DetailCreateBtn from './detail-create-btn'

function MobileDetailContent({ day, events, todayWeather }: { day: Day; events: CalendarEvent[]; todayWeather?: FormattedWeather | null }) {
 const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
 const [currentColor, setCurrentColor] = useState<ColorOption>(color)

 useEffect(() => {
  setCurrentColor(color)
 }, [color])
 const dayLabel = dayjs(day.date).format('dddd')
 return (
  <div className='z-40 relative '>
   <div
    style={{ color: currentColor.text }}
    className='flex justify-between items-center mr-4 text-xl tablet:text-2xl h-16 pl-8 pr-6 pt-4 '>
    <span>{dayLabel}</span>
    <span className='text-base tablet:text-lg'>{dayjs(day.date).format('MMMM D, YYYY')}</span>
   </div>
   <div
    style={{
     scrollbarWidth: 'thin',
     scrollbarColor: `${currentColor.value} transparent`,
    }}
    className='bg-black h-[320px] overflow-y-scroll'>
    <DetailCreateBtn
     day={day}
     currentColor={currentColor}
    />
    {events.map((event, index) => (
     <DayEvent
      key={event.id}
      color={currentColor}
      event={event}
     />
    ))}
   </div>
   {todayWeather && (
    <div
     className='flex justify-between'
     style={{ color: currentColor.text }}>
     <div className='text-2xl tablet:text-3xl ml-8 mt-2'>
      {todayWeather.minTemp}° / {todayWeather.maxTemp}°
     </div>
     <div className='flex items-center mr-8 mt-2 text-2xl tablet:text-3xl'>
      {todayWeather.precipProb}% <Raindrop className='w-8 h-8 -ml-1 -mt-0.5' />
     </div>
    </div>
   )}
  </div>
 )
}

export default MobileDetailContent
