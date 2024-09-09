'use client'
import React, { use, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Day as DayType, CalendarEvent, Weather, FormattedWeather, ColorOption, colorDefault } from '@/types/types'
import DayDetail from '../detail/day-detail'
import { cn } from '@/app/lib/utils'
import { Raindrop } from '../icons/raindrop'
import dayjs from '@/app/lib/dayjs'
import { trunc } from '@/app/lib/utils'
import { colorOptions } from '@/data/color-options'

type Props = {
 day: DayType
 index: number
 events: CalendarEvent[]
 todayWeather?: FormattedWeather
}

function Day({ day, index, events, todayWeather }: Props) {
 const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
 const [currentColor, setCurrentColor] = useState<ColorOption>(colorDefault)
 const eventsForDay = events?.filter((event) => event.start.date?.includes(day.date) || event.start.dateTime?.includes(day.date))
 const isToday = dayjs().format('YYYY-MM-DD') === day.date
 const dayLabel = trunc(dayjs(day.date).format('dddd'))
 const isThisMonth = day.isCurrentMonth
 const maxTemp = todayWeather ? Math.round(todayWeather?.maxTemp) : 0
 const minTemp = todayWeather ? Math.round(todayWeather?.minTemp) : 0
 const precip = todayWeather ? Math.round(todayWeather?.precipProb) : 0
 useEffect(() => {
  setCurrentColor(color)
 }, [color])
 const time = (datetime: string | undefined) => {
  if (datetime) {
   return dayjs(datetime).format('h:mm a')
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
   <div className={cn('relative day-bg opacity-40', isThisMonth && 'opacity-100')}>
    <div className='absolute bg-black rounded-xl top-[9px] right-[9px] left-[4px] bottom-[4px] z-0'></div>
    <div className='aspect-square relative rounded-lg z-10 flex justify-between flex-col'>
     <li
      className='text-end p-2 pl-[7px]'
      key={index}>
      <div className=' flex justify-between pr-[6px] pt-[6px]'>
       <div
        style={{ backgroundColor: currentColor.value, color: currentColor.text }}
        className='text-[.55rem] font-semibold flex justify-center items-center  rounded-[4px] py-0.5 mr-1 h-max w-[54px]'>
        {dayLabel}
       </div>
       <div
        style={{ backgroundColor: currentColor.value, color: currentColor.text }}
        className='flex justify-center text-white text-lg rounded-[4px] w-[29px]'>
        {day.day}
       </div>
      </div>
      {eventsForDay?.length > 0 &&
       eventsForDay.map((event) => (
        <div
         style={{ borderColor: currentColor.ul }}
         className='flex justify-between border-b mr-1 text-[.5rem] text-white'
         key={event.id}>
         <div
          style={{ color: currentColor.value }}
          className=''>
          {time(event.start.dateTime)} -{' '}
         </div>
         <div
          style={{ color: currentColor.value }}
          className=' truncate '>
          {trunc(event.summary, 13, true)}
         </div>
        </div>
       ))}
     </li>
     <div
      style={{ backgroundColor: currentColor.value, color: currentColor.text }}
      className='flex justify-between font-semibold text-xs absolute bottom-[5px] right-[9px] left-[3px] pl-[6px] rounded-b-xl'>
      <div className={cn(todayWeather ? 'opacity-100' : 'opacity-0', precip === 100 && 'text-[.7rem]')}>
       {minTemp}°/ {maxTemp}°
      </div>
      <div className={cn('flex justify-end items-start', todayWeather ? 'opacity-100' : 'opacity-0', precip === 100 && 'text-[.7rem]')}>
       {precip}% <Raindrop className='w-4 h-4 -ml-1 -mt-0.5' />
      </div>
     </div>
    </div>
    <div className='gloss absolute top-[8px] left-1 right-[8px] bottom-10 z-20'></div>
   </div>
  </DayDetail>
 )
}

export default Day

// calendar-days
