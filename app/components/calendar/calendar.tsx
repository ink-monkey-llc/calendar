import React from 'react'
import { getGoogleCalendarEvents } from '@/app/lib/calendar'
import type { CalendarEvent } from '@/types/types'
import { auth } from '@/auth'
import { getWeather } from '@/actions/weather'
import MonthSelect from './month-select'
import dynamic from 'next/dynamic'

async function Calendar({ month, year }: { month: number; year: number }) {
 const Days = dynamic(() => import('./days'), { ssr: false })
 const session = await auth()
 const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

 if (!session || !session.accessToken || !session.idToken || !session.refreshToken || !session.expiresIn) {
  return <div>Sign in to access your calendar</div>
 }
 //  console.log(session)
 const events = await getGoogleCalendarEvents(session.accessToken, session.idToken, session.refreshToken, session.expiresIn)

 const weather = await getWeather(65804, month - 1, year)

 return (
  <div className='w-full max-w-[1200px] mx-auto'>
   <MonthSelect
    month={month}
    year={year}
   />
   <Days
    year={year}
    month={month}
    events={events as CalendarEvent[]}
    weather={weather}
   />
  </div>
 )
}

export default Calendar
