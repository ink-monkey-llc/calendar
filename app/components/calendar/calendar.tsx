import React from 'react'
import { days } from '../../lib/date-utils'
import { getGoogleCalendarEvents } from '@/app/lib/calendar'
import type { CalendarEvent } from '@/types/types'
import { auth } from '@/auth'
import Day from './day'
import dayjs from '@/app/lib/dayjs'
import { getWeather } from '@/actions/weather'

async function Calendar({ month, year }: { month: number; year: number }) {
 const session = await auth()
 const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

 if (!session || !session.accessToken || !session.refreshToken) {
  return <div>Sign in to access your calendar</div>
 }

 const events = await getGoogleCalendarEvents(session.accessToken, session.refreshToken)

 const weather = await getWeather(65804)

 const selectedMonth = dayjs()
  .month(month - 1)
  .format('MMMM')
 const today = dayjs().format('MMMM D, YYYY')

 return (
  <div className=' max-w-[1200px] mx-auto'>
   <ul className='grid grid-cols-11 h-full  border-t-black'>
    {days(year, month).map((day, index) => {
     const todayWeather = weather.filter((weather) => weather.date === day.date)
     return (
      <Day
       todayWeather={todayWeather[0]}
       events={events as CalendarEvent[]}
       key={index}
       day={day}
       index={index}
      />
     )
    })}
   </ul>
  </div>
 )
}

export default Calendar
