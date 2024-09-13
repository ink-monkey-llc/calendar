import React, { useState } from 'react'
import { ColorOption } from '@/types/types'
import 'react-datepicker/dist/react-datepicker.css'
import DateRange from './inputs/date-range'
import AllDay from './inputs/all-day'
import Time from './inputs/time'
import Summary from './inputs/summary'
import Description from './inputs/description'
import Location from './inputs/location'
import Submit from './inputs/submit'
import { set, setTime } from 'react-datepicker/dist/date_utils'
function CreateContent({ color }: { color: ColorOption }) {
 const [allDay, setAllDay] = useState(true)
 const [summary, setSummary] = useState('')
 const [description, setDescription] = useState('')
 const [startDate, setStartDate] = useState(new Date())
 const [endDate, setEndDate] = useState(new Date())
 const [times, setTimes] = useState({ startTime: new Date().toString(), endTime: new Date().toString() })

 const changeTime = (pos: 'start' | 'end', e: React.ChangeEvent<HTMLInputElement>) => {
  if (pos === 'start') {
   setTimes({ ...times, startTime: e.target.value })
  } else {
   setTimes({ ...times, endTime: e.target.value })
  }
 }

 return (
  <div className='z-50 relative pl-2 pr-4 pt-2 '>
   <form
    style={{
     scrollbarWidth: 'thin',
     scrollbarColor: `${color.value} transparent`,
    }}
    className='bg-black h-[300px] mr-[14px] px-2 overflow-y-scroll flex flex-col'>
    <Summary
     summary={summary}
     setSummary={setSummary}
    />
    <DateRange
     startDate={startDate}
     endDate={endDate}
     setEndDate={setEndDate}
     setStartDate={setStartDate}
    />
    <div className='flex gap-2 items-center mt-2'>
     <Time
      allDay={allDay}
      setAllDay={setAllDay}
      setTime={changeTime}
      times={times}
      pos='start'
     />
     <Time
      allDay={allDay}
      setAllDay={setAllDay}
      setTime={changeTime}
      times={times}
      pos='end'
     />
     <AllDay
      allDay={allDay}
      setAllDay={setAllDay}
      setTimes={setTimes}
     />
    </div>
    <Description
     description={description}
     setDescription={setDescription}
    />
    <Location />
    <Submit />
   </form>
  </div>
 )
}

export default CreateContent
