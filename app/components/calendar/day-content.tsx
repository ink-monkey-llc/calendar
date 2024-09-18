import React from 'react'
import { trunc, cn } from '@/app/lib/utils'
import dayjs from 'dayjs'
import { Raindrop } from '../icons/raindrop'
import { Day as DayType, CalendarEvent, FormattedWeather, ColorOption } from '@/types/types'
function DayContent({
 day,
 index,
 eventsForDay,
 todayWeather,
 currentColor,
}: {
 day: DayType
 index: number
 eventsForDay: CalendarEvent[]
 todayWeather?: FormattedWeather | null
 currentColor: ColorOption
}) {
 const dayLabel = trunc(dayjs(day.date).format('dddd'))
 const maxTemp = todayWeather ? Math.round(todayWeather?.maxTemp) : 0
 const minTemp = todayWeather ? Math.round(todayWeather?.minTemp) : 0
 const precip = todayWeather ? Math.round(todayWeather?.precipProb) : 0

 const time = (datetime: string | undefined) => {
  if (datetime) {
   return dayjs(datetime).format('h:mm a')
  } else {
   return 'All day'
  }
 }

 const eventColor = currentColor.value ? currentColor.value : 'white'

 return (
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
       className='flex  border-b mr-1 text-[.5rem] text-white'
       key={event.id}>
       <div
        style={{ color: eventColor }}
        className=''>
        {time(event.start.dateTime)} -
       </div>
       <div
        style={{ color: eventColor }}
        className=' truncate ml-1'>
        {trunc(event.summary, 13, true)}
       </div>
      </div>
     ))}
   </div>
   <div
    style={{ backgroundColor: currentColor.value, color: currentColor.text }}
    className='flex justify-between font-semibold text-xs absolute bottom-[5px] right-[9px] left-[3px] pl-[6px] rounded-b-xl'>
    <div className={cn(todayWeather ? 'opacity-100' : 'opacity-0', maxTemp > 99 && 'text-[.7rem]')}>
     {minTemp}°/ {maxTemp}°
    </div>
    <div className={cn('flex justify-end items-start', todayWeather ? 'opacity-100' : 'opacity-0', precip === 100 && 'text-[.7rem]')}>
     {precip}% <Raindrop className='w-4 h-4 -ml-1 -mt-0.5' />
    </div>
   </div>
  </div>
 )
}

export default DayContent
