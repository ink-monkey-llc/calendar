'use client'
import { useState, useEffect } from 'react'
import { CalendarEvent, ColorOption, Day, FormattedWeather, colorDefault } from '@/types/types'
import { cn } from '@/app/lib/utils'
import React from 'react'
import { useLocalStorage, useWindowSize } from 'usehooks-ts'
import dayjs from '@/app/lib/dayjs'
import DayEvent from './day-event'
import { Raindrop } from '../icons/raindrop'
import DetailCreateBtn from './detail-create-btn'
import { useQuery } from '@tanstack/react-query'
import { getEvents } from '@/app/resource/events'

function DetailContent({ day, todayWeather }: { day: Day; todayWeather?: FormattedWeather | null }) {
  const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
  const [currentColor, setCurrentColor] = useState<ColorOption>(color)
  const { width } = useWindowSize()
  const isMobile = width < 465

  const { data: events } = useQuery({ queryKey: ['events', day.date], queryFn: () => getEvents(day.date, true) })

  useEffect(() => {
    setCurrentColor(color)
  }, [color])
  const dayLabel = dayjs(day.date).format('dddd')


  return (
    <div className='z-40 relative pl-2 pr-4 pt-2 '>
      <div
        style={{ color: currentColor.text }}
        className='flex justify-between items-center mr-4 text-xl tablet:text-2xl h-16 pl-8 pr-6 pt-4 '>
        <span>{dayLabel}</span>
        <span className='text-base tablet:text-lg'>{dayjs(day.date).format('MMMM D, YYYY')}</span>
      </div>
      <div
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${currentColor.value} transparent`,
        }}
        className={cn('bg-black mr-[14px] h-[260px] overflow-y-scroll', isMobile && 'h-[290px]')}>
        <DetailCreateBtn
          day={day}
          currentColor={currentColor}
        />

        {!events || (events.length < 1 && <div className='mt-4 text-lg text-center'>No events today</div>)}
        {events &&
          events.map((event, index) => (
            <DayEvent
              key={event.id}
              color={currentColor}
              event={event as CalendarEvent}
            />
          ))}
      </div>
      {todayWeather && (
        <div
          className='flex justify-between'
          style={{ color: currentColor.text }}>
          <div className='text-2xl tablet:text-3xl ml-4 mt-2'>
            {todayWeather.minTemp}° / {todayWeather.maxTemp}°
          </div>
          <div className='flex items-center mr-8 mt-2 text-2xl tablet:text-3xl'>
            {todayWeather.precipProb}% <Raindrop className='w-8 h-8 -ml-1 -mt-0.5' />
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailContent
