import React from 'react'
import { days } from '../../lib/date-utils'
import { getLastMonthYear, getNextMonthYear } from '@/app/lib/utils'
import { getGoogleCalendarEvents } from '@/app/lib/calendar'
import type { CalendarEvent } from '@/types/types'
import { auth } from '@/auth'
import Day from './day'
import dayjs from '@/app/lib/dayjs'
import { getWeather } from '@/actions/weather'
import MonthSelect from './month-select'
import DayDetail from '../detail/day-detail'
import Days from './days'

async function Calendar({ month, year }: { month: number; year: number }) {
 const session = await auth()
 const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

 if (!session || !session.accessToken || !session.idToken || !session.refreshToken || !session.expiresIn) {
  return <div>Sign in to access your calendar</div>
 }
 //  console.log(session)
 const events = await getGoogleCalendarEvents(session.accessToken, session.idToken, session.refreshToken, session.expiresIn)

 const weather = await getWeather(65804, month - 1, year)

 const selectedMonth = dayjs()
  .month(month - 1)
  .format('MMMM')
 const today = dayjs().format('MMMM D, YYYY')

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
