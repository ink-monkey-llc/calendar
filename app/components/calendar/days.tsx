'use client'
import { CalendarEvent, FormattedWeather } from '@/types/types'
import { useWindowSize } from 'usehooks-ts'
import React from 'react'
import Day from './day'
import DayMobile from './day-mobile'
import { days } from '@/app/lib/date-utils'

function Days({ year, month, events, weather }: { year: number; month: number; events: CalendarEvent[]; weather: FormattedWeather[] }) {
 const { width } = useWindowSize()
 const isMobile = width < 465
 const calSize = (width: number) => {
  if (width < 780) {
   return 32
  } else if (width < 1221) {
   return 35
  } else {
   return 33
  }
 }
 const daysArray = days(year, month, calSize(width))
 return (
  <div className='grid grid-cols-4 tablet:grid-cols-7 desktop:grid-cols-11 h-full  border-t-black w-full mt-2 tablet:mt-0'>
   {daysArray.map((day, index) => {
    const todayWeather = weather.filter((weather) => weather.date === day.date)
    return (
     <div key={day.date}>
      {isMobile ? (
       <DayMobile
        todayWeather={todayWeather[0]}
        events={events as CalendarEvent[]}
        key={index}
        day={day}
        index={index}
       />
      ) : (
       <Day
        todayWeather={todayWeather[0]}
        events={events as CalendarEvent[]}
        key={index}
        day={day}
        index={index}
       />
      )}
     </div>
    )
   })}
  </div>
 )
}

export default Days
