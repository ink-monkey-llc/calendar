'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Day as DayType, CalendarEvent, FormattedWeather, ColorOption, colorDefault } from '@/types/types'
import DayDetail from '../detail/day-detail'
import { cn } from '@/app/lib/utils'
import dayjs from '@/app/lib/dayjs'
import DayContent from './day-content'

type Props = {
  day: DayType
  index: number
  events: CalendarEvent[] | []
  todayWeather?: FormattedWeather | null
}

function Day({ day, index, events, todayWeather }: Props) {
  const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
  const [currentColor, setCurrentColor] = useState<ColorOption>(colorDefault)
  const eventsForDay = events ? events?.filter(
    (event) =>
      event.start.date?.includes(day.date) ||
      event.start.dateTime?.includes(day.date) ||
      event.end.dateTime?.includes(day.date) ||
      event.end.date?.includes(day.date) ||
      (new Date(day.date) > new Date(event.start.date) && new Date(day.date) < new Date(event.end.date)) ||
      (new Date(day.date) > new Date(event.start.dateTime) && new Date(day.date) < new Date(event.end.dateTime))
  ) : []

  const isToday = dayjs().isSame(day.date, 'day')

  const isThisMonth = day.isCurrentMonth

  useEffect(() => {
    setCurrentColor(color)
  }, [color])

  return (
    <DayDetail
      todayWeather={todayWeather}
      currentColor={currentColor}
      day={day}>
      <div className={cn('relative day-bg opacity-40 w-[108px] h-[108px] m-auto tablet:mb-[12px] desktop:mb-0', isThisMonth && 'opacity-100')}>
        <div
          style={{ backgroundColor: isToday ? color.value : 'black', borderColor: isToday ? color.text : 'transparent' }}
          className={cn('absolute bg-black rounded-xl top-[9px] right-[9px] left-[4px] bottom-[4px] z-0 border')}
        />

        <DayContent
          day={day}
          index={index}
          eventsForDay={eventsForDay}
          todayWeather={todayWeather}
          currentColor={currentColor}
        />

        <div className='gloss absolute top-[8px] left-1 right-[8px] bottom-10 z-20' />
      </div>
    </DayDetail>
  )
}

export default Day
