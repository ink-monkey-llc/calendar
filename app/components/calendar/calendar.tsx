import React from 'react'
import type { CalendarEvent } from '@/types/types'
import { getWeather } from '@/actions/weather'
import MonthSelect from './month-select'
import dynamic from 'next/dynamic'
import { getEvents } from '@/app/resource/events'

async function Calendar({ month, year }: { month: number; year: number }) {
 const Days = dynamic(() => import('./days'), { ssr: false })

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
    weather={weather}
   />
  </div>
 )
}

export default Calendar
