import React from 'react'
import dayjs from '../../lib/dayjs'
import { daysInMonth } from '../../lib/utils'

function Calendar() {
 const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

 return (
  <div className='relative bg-gray-800 border border-gray-800'>
   <section className='flex justify-between p-2 bg-gray-900'>
    <div className='text-lg font-semibold'>Selected Month</div>
    <div className='flex items-center justify-between w-20 '>
     <span className='cursor-pointer'>{`<`}</span>
     <span className='cursor-pointer'>Today</span>
     <span className='cursor-pointer'>{`>`}</span>
    </div>
   </section>
   <ul className='text-lg bg-gray-600 pb-[5px] pt-[10px] grid grid-cols-7 gap-x-1'>
    {weekdays.map((day, index) => (
     <li
      className='text-end pr-[5px]'
      key={index}>
      {day}
     </li>
    ))}
   </ul>
   <ul className='grid grid-cols-7 relative h-full gap-[1px] border-t-black'></ul>
  </div>
 )
}

export default Calendar
