import React from 'react'
import DatePicker from 'react-datepicker'
import { useNewEventStore } from '@/app/lib/zustand/store'

function DateRange() {
 const startDate = useNewEventStore((state) => state.startDate)
 const endDate = useNewEventStore((state) => state.endDate)
 const setStartDate = useNewEventStore((state) => state.setStartDate)
 const setEndDate = useNewEventStore((state) => state.setEndDate)

 const onStartDateChange = (date: Date) => {
  setStartDate(date)
  if (date > endDate) {
   setEndDate(date)
  }
 }

 console.log('daterange', startDate, endDate)

 return (
  <div className='border flex gap-2 items-center justify-between w-max border-white/20  rounded-lg pl-2 mt-2'>
   <DatePicker
    selected={startDate}
    popperPlacement='left-start'
    className='bg-transparent cursor-pointer w-36 text-sm'
    onChange={(date) => onStartDateChange(date as Date)}
    dateFormat='MMMM d, yyyy'
    selectsStart
    startDate={startDate}
    endDate={endDate}
   />
   <span>-</span>
   <DatePicker
    selected={endDate}
    popperPlacement='left-start'
    className='bg-transparent w-36 cursor-pointer text-sm ml-2'
    onChange={(date) => setEndDate(date as Date)}
    dateFormat='MMMM d, yyyy'
    selectsEnd
    startDate={startDate}
    endDate={endDate}
    minDate={startDate}
   />
  </div>
 )
}

export default DateRange
