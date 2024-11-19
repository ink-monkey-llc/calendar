'use client'
import React from 'react'
import { CalendarEvent } from '@/types/types'
import { useWindowSize } from 'usehooks-ts'
import { useQuery } from '@tanstack/react-query'
import Day from './day'
import { getWeather } from '@/app/resource/weather'
import DayMobile from './day-mobile'
import { days } from '@/app/lib/date-utils'
import { getEvents } from '@/app/resource/events'

function Days({ year, month }: { year: number; month: number }) {
 const eventsQuery = useQuery({ queryKey: ['events'], queryFn: getEvents })

 const weatherFetch = async () => {
  return getWeather(65804, month - 1, year)
 }

 const weatherQuery = useQuery({
  queryKey: ['weather'],
  queryFn: weatherFetch,
  refetchOnWindowFocus: false,
 })

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
    const weatherArray = weatherQuery.data?.filter((weather) => weather.date === day.date)
    const todayWeather = weatherArray && weatherArray?.length > 0 ? weatherArray[0] : null
    return (
     <div key={day.date}>
      {isMobile ? (
       <DayMobile
        todayWeather={todayWeather}
        events={eventsQuery.isPending ? [] : (eventsQuery.data as CalendarEvent[])}
        key={index}
        day={day}
        index={index}
       />
      ) : (
       <Day
        todayWeather={todayWeather}
        events={eventsQuery.isPending ? [] : (eventsQuery.data as CalendarEvent[])}
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
