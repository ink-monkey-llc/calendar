'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Day as DayType, CalendarEvent, FormattedWeather, ColorOption, colorDefault } from '@/types/types'
import DayDetail from '../detail/day-detail'
import { cn } from '@/app/lib/utils'
import dynamic from 'next/dynamic'
import DayContent from './day-content'

type Props = {
 day: DayType
 index: number
 events: CalendarEvent[]
 todayWeather?: FormattedWeather | null
}

function Day({ day, index, events, todayWeather }: Props) {
 const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
 const [currentColor, setCurrentColor] = useState<ColorOption>(colorDefault)
 const eventsForDay = events?.filter((event) => event.start.date?.includes(day.date) || event.start.dateTime?.includes(day.date))

 //  const DayContent = dynamic(() => import('./day-content'), { ssr: false })

 const isThisMonth = day.isCurrentMonth
 useEffect(() => {
  setCurrentColor(color)
 }, [color])

 return (
  <DayDetail
   todayWeather={todayWeather}
   events={eventsForDay}
   currentColor={currentColor}
   day={day}>
   <div className={cn('relative day-bg opacity-40 w-[108px] h-[108px] m-auto tablet:mb-[12px] desktop:mb-0', isThisMonth && 'opacity-100')}>
    <div className='absolute bg-black rounded-xl top-[9px] right-[9px] left-[4px] bottom-[4px] z-0'></div>
    {/* <Suspense fallback={<div className='w-[108px] h-[108px] z-50'>Loading...</div>}> */}
    <DayContent
     day={day}
     index={index}
     eventsForDay={eventsForDay}
     todayWeather={todayWeather}
     currentColor={currentColor}
    />
    {/* </Suspense> */}
    <div className='gloss absolute top-[8px] left-1 right-[8px] bottom-10 z-20'></div>
   </div>
  </DayDetail>
 )
}

export default Day

// calendar-days
