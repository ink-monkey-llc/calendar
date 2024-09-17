import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNewEventStore } from '@/app/lib/zustand/store'
import { makeEventDates } from '@/app/lib/date-utils'
import { createEvent } from '@/app/resource/events'

function Submit() {
 const summary = useNewEventStore((state) => state.summary)
 const description = useNewEventStore((state) => state.description)
 const location = useNewEventStore((state) => state.location)
 const startDate = useNewEventStore((state) => state.startDate)
 const endDate = useNewEventStore((state) => state.endDate)
 const startTime = useNewEventStore((state) => state.startTime)
 const endTime = useNewEventStore((state) => state.endTime)
 const allDay = useNewEventStore((state) => state.allDay)

 const event = () => {
  const dates = makeEventDates(startDate.toString(), endDate.toString(), startTime.toString(), endTime.toString(), allDay)
  return {
   start: dates.start,
   end: dates.end,
   summary: summary,
   description: description,
   location: location,
  }
 }

 const mutation = useMutation({
  mutationFn: (event: any) => {
   return createEvent(event)
  },
 })

 const handleSubmit = () => {
  mutation.mutate(event())
 }

 return (
  <div
   onClick={handleSubmit}
   className='cursor-pointer m-auto px-4 py-0.5 rounded-lg bg-black border-2 border-white text-white font-semibold hover:bg-white hover:text-black'>
   {mutation.isPending ? 'Creating event...' : mutation.isError ? 'Error creating event' : 'Create'}
  </div>
 )
}

export default Submit
