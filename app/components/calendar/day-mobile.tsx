'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage, useWindowSize } from 'usehooks-ts'
import { Day as DayType, CalendarEvent, FormattedWeather, ColorOption, colorDefault } from '@/types/types'
import MobileDayDetail from '../detail/mobile-day-detail'
import { cn } from '@/app/lib/utils'
import { Raindrop } from '../icons/raindrop'
import dayjs from '@/app/lib/dayjs'
import { trunc } from '@/app/lib/utils'
import DayDetail from '../detail/day-detail'

type Props = {
 day: DayType
 index: number
 events: CalendarEvent[]
 todayWeather?: FormattedWeather | null
}

function DayMobile({ day, index, events, todayWeather }: Props) {
 const { width } = useWindowSize()
 const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
 const [currentColor, setCurrentColor] = useState<ColorOption>(colorDefault)
 const eventsForDay = events?.filter(
  (event) =>
   event.start.date?.includes(day.date) ||
   event.start.dateTime?.includes(day.date) ||
   event.end.dateTime?.includes(day.date) ||
   event.end.date?.includes(day.date) ||
   (new Date(day.date) > new Date(event.start.date) && new Date(day.date) < new Date(event.end.date)) ||
   (new Date(day.date) > new Date(event.start.dateTime) && new Date(day.date) < new Date(event.end.dateTime))
 )
 const isToday = dayjs().format('YYYY-MM-DD') === day.date
 const dayLabel = trunc(dayjs(day.date).format('dddd'), 7)
 const isThisMonth = day.isCurrentMonth
 const maxTemp = todayWeather ? Math.round(todayWeather?.maxTemp) : 0
 const minTemp = todayWeather ? Math.round(todayWeather?.minTemp) : 0
 const precip = todayWeather ? Math.round(todayWeather?.precipProb) : 0
 useEffect(() => {
  setCurrentColor(color)
 }, [color])
 const time = (event: CalendarEvent) => {
  if (event.start.dateTime) {
   if (new Date(day.date) > new Date(event.start.dateTime) && new Date(day.date) < new Date(event.end.dateTime)) {
    return 'All day'
   }
   return dayjs(event.start.dateTime).format('h:mm a')
  } else {
   return 'All day'
  }
 }
 return (
  <DayDetail
   todayWeather={todayWeather}
   events={eventsForDay}
   currentColor={currentColor}
   day={day}>
   <div className={cn('relative day-bg opacity-40 w-full max-w-[87px] m-auto', isThisMonth && 'opacity-100', width > 420 && 'mb-2')}>
    <div
     style={{ backgroundColor: isToday ? currentColor.value : 'black', borderColor: isToday ? currentColor.text : 'transparent' }}
     className='absolute bg-black rounded-xl top-[9px] right-[9px] left-[4px] bottom-[4px] z-0 border'></div>
    <div className='aspect-square relative rounded-lg z-10 flex justify-between flex-col'>
     <div
      className='text-end p-2 pl-[7px]'
      key={index}>
      <div className=' flex justify-between pr-[6px] pt-[6px]'>
       <div
        style={{ backgroundColor: currentColor.value, color: currentColor.text, borderColor: isToday ? currentColor.text : 'transparent' }}
        className='text-[.55rem] font-semibold flex justify-center items-center  rounded-[4px] py-0.5 mr-1 h-max w-[54px] border'>
        {dayLabel}
       </div>
       <div
        style={{ backgroundColor: currentColor.value, color: currentColor.text, borderColor: isToday ? currentColor.text : 'transparent' }}
        className='flex justify-center text-white text-lg rounded-[4px] w-[29px] leading-tight border'>
        {day.day}
       </div>
      </div>
      {eventsForDay?.length > 0 &&
       eventsForDay.map((event) => (
        <div
         style={{ borderColor: currentColor.ul, color: isToday ? currentColor.text : 'white' }}
         className='flex justify-between border-b mr-1 text-[.4rem]'
         key={event.id}>
         <div className=''>{time(event)} - </div>
         <div className=' truncate '>{trunc(event.summary, 11, true)}</div>
        </div>
       ))}
     </div>
     <div
      style={{ backgroundColor: currentColor.value, color: currentColor.text, borderColor: isToday ? currentColor.text : 'transparent' }}
      className='flex justify-between font-medium text-[.5rem] absolute bottom-[5px] right-[10px] left-[5px] pl-[6px] rounded-b-xl border-t'>
      <div className={cn(todayWeather ? 'opacity-100' : 'opacity-0', minTemp > 99 && 'text-[.4rem]')}>
       {minTemp}°/ {maxTemp}°
      </div>
      <div className={cn('flex justify-end items-start', todayWeather ? 'opacity-100' : 'opacity-0', precip === 100 && 'text-[.4rem]')}>
       {precip}% <Raindrop className='w-4 h-4 -ml-1 -mt-0.5' />
      </div>
     </div>
    </div>
    <div className='gloss absolute top-[8px] left-1 right-[8px] bottom-10 z-20'></div>
   </div>
  </DayDetail>
 )
}

export default DayMobile

// calendar-days
