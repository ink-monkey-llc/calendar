'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage, useWindowSize } from 'usehooks-ts'
import { Day as DayType, CalendarEvent, FormattedWeather, ColorOption, colorDefault } from '@/types/types'
import MobileDayDetail from '../detail/mobile-day-detail'
import { cn } from '@/app/lib/utils'
import { Raindrop } from '../icons/raindrop'
import dayjs from '@/app/lib/dayjs'
import { trunc } from '@/app/lib/utils'

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
 const eventsForDay = events?.filter((event) => event.start.date?.includes(day.date) || event.start.dateTime?.includes(day.date))
 const isToday = dayjs().format('YYYY-MM-DD') === day.date
 const dayLabel = trunc(dayjs(day.date).format('dddd'), 7)
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
  <MobileDayDetail
   todayWeather={todayWeather}
   events={eventsForDay}
   currentColor={currentColor}
   day={day}>
   <div className={cn('relative day-bg opacity-40 w-full max-w-[87px]', isThisMonth && 'opacity-100', width > 420 && 'mb-2')}>
    <div className='absolute bg-black rounded-xl top-[9px] right-[9px] left-[4px] bottom-[4px] z-0'></div>
    <div className='aspect-square relative rounded-lg z-10 flex justify-between flex-col'>
     <div
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
         className='flex justify-between border-b mr-1 text-[.4rem] text-white'
         key={event.id}>
         <div
          //   style={{ color: currentColor.value }}
          className=''>
          {time(event.start.dateTime)} -{' '}
         </div>
         <div
          //   style={{ color: currentColor.value }}
          className=' truncate '>
          {trunc(event.summary, 11, true)}
         </div>
        </div>
       ))}
     </div>
     <div
      style={{ backgroundColor: currentColor.value, color: currentColor.text }}
      className='flex justify-between font-medium text-[.5rem] absolute bottom-[5px] right-[9px] left-[3px] pl-[6px] rounded-b-xl'>
      <div className={cn(todayWeather ? 'opacity-100' : 'opacity-0', minTemp > 99 && 'text-[.5rem]')}>
       {minTemp}°/ {maxTemp}°
      </div>
      <div className={cn('flex justify-end items-start', todayWeather ? 'opacity-100' : 'opacity-0', precip === 100 && 'text-[.5rem]')}>
       {precip}% <Raindrop className='w-4 h-4 -ml-1 -mt-0.5' />
      </div>
     </div>
    </div>
    <div className='gloss absolute top-[8px] left-1 right-[8px] bottom-10 z-20'></div>
   </div>
  </MobileDayDetail>
 )
}

export default DayMobile

// calendar-days
