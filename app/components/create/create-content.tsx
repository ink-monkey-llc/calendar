import React, { useState } from 'react'
import { ColorOption } from '@/types/types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CalendarIcon } from '../icons/calendar'
import { cn } from '@/app/lib/utils'
import { CheckIcon } from '../icons/check'
import DateRange from './inputs/date-range'
import AllDay from './inputs/all-day'
import Time from './inputs/time'
import Summary from './inputs/summary'
import Description from './inputs/description'
import Submit from './inputs/submit'
function CreateContent({ color }: { color: ColorOption }) {
 const [allDay, setAllDay] = useState(true)
 const [summary, setSummary] = useState('')
 const [startDate, setStartDate] = useState(new Date())
 const [endDate, setEndDate] = useState(new Date())
 return (
  <div className='z-50 relative pl-2 pr-4 pt-2 '>
   <form
    style={{
     scrollbarWidth: 'thin',
     scrollbarColor: `${color.value} transparent`,
    }}
    className='bg-black h-[250px] mr-[14px] px-2 overflow-y-scroll flex flex-col'>
    <Summary />
    <DateRange
     startDate={startDate}
     endDate={endDate}
     setEndDate={setEndDate}
     setStartDate={setStartDate}
    />
    <div className='flex gap-2 items-center mt-2'>
     <Time
      allDay={allDay}
      pos='start'
     />
     <Time
      allDay={allDay}
      pos='end'
     />
     <AllDay
      allDay={allDay}
      setAllDay={setAllDay}
     />
    </div>
    <Description />
    <Submit />
   </form>
  </div>
 )
}

export default CreateContent
