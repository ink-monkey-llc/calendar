import React, { useState } from 'react'
import { ColorOption } from '@/types/types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CalendarIcon } from '../icons/calendar'
function CreateContent({ color }: { color: ColorOption }) {
 const [summary, setSummary] = useState('')
 const [eventDate, setEventDate] = useState(new Date())
 return (
  <div className='z-50 relative pl-2 pr-4 pt-2 '>
   <form
    style={{
     scrollbarWidth: 'thin',
     scrollbarColor: `${color.value} transparent`,
    }}
    className='bg-black h-56 mr-[14px] px-2 overflow-y-scroll flex flex-col'>
    <input
     className=' w-full bg-transparent border-b py-2 border-white/20 focus-within:border-white/80'
     id='summary'
     name='summary'
     type='text'
     placeholder='Event summary'
    />
    <div className='border border-white/20 w-max rounded-lg pl-2 mt-2'>
     <DatePicker
      selected={eventDate}
      showIcon
      className='bg-transparent cursor-pointer w-max'
      onChange={(date) => setEventDate(date as Date)}
      dateFormat='MMMM d, yyyy'
      placeholderText='Event date'
     />
    </div>
    <div className='flex gap-2 items-center mt-2'>
     <input
      className='w-max'
      name='allDay'
      id='allDay'
      type='checkbox'
     />
     <label
      htmlFor='allDay'
      className='text-sm  '>
      All day
     </label>
    </div>
   </form>
  </div>
 )
}

export default CreateContent
