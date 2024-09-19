import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNewEventStore } from '@/app/lib/zustand/store'
import { useDialog } from '../motion/dialog'
import { makeEventDates } from '@/app/lib/date-utils'
import { createEvent, callUpdateEvent } from '@/app/resource/events'
export type EventType = { start: {}; end: {}; summary: string; description: string; location: string }

function Submit() {
 const summary = useNewEventStore((state) => state.summary)
 const description = useNewEventStore((state) => state.description)
 const location = useNewEventStore((state) => state.location)
 const startDate = useNewEventStore((state) => state.startDate)
 const endDate = useNewEventStore((state) => state.endDate)
 const startTime = useNewEventStore((state) => state.startTime)
 const endTime = useNewEventStore((state) => state.endTime)
 const allDay = useNewEventStore((state) => state.allDay)
 const isEdit = useNewEventStore((state) => state.isEdit)
 const eventId = useNewEventStore((state) => state.eventId)
 const reset = useNewEventStore((state) => state.reset)

 const { setIsOpen } = useDialog()

 const queryClient = useQueryClient()

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

 const mutFn = (event: EventType) => {
  if (isEdit) {
   console.log(event)
   return callUpdateEvent(eventId, event)
  }
  return createEvent(event)
 }

 const mutation = useMutation({
  mutationFn: (event: any) => {
   return mutFn(event)
  },
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ['events'] })
   reset()
   setIsOpen(false)
  },
 })

 const handleSubmit = () => {
  mutation.mutate(event())
 }

 return (
  <div
   onClick={handleSubmit}
   className='cursor-pointer m-auto px-4 py-0.5 rounded-lg bg-black border-2 border-white text-white font-semibold hover:bg-white hover:text-black'>
   {!isEdit && (mutation.isPending ? 'Creating event...' : mutation.isError ? 'Error creating event' : 'Create')}
   {isEdit && (mutation.isPending ? 'Updating event...' : mutation.isError ? 'Error updating event' : 'Update')}
  </div>
 )
}

export default Submit