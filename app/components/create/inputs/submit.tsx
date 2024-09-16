import React, { useEffect, useState } from 'react'
import type { Event as EventType } from '@/types/types'
import type { Session } from 'next-auth'
import { getUserSession } from '@/app/lib/googleAuth'
import { useNewEventStore } from '@/app/lib/zustand/store'
import { makeEventDates } from '@/app/lib/date-utils'

function Submit() {
 const [session, setSession] = useState<Session | null>(null)
 const summary = useNewEventStore((state) => state.summary)
 const description = useNewEventStore((state) => state.description)
 const location = useNewEventStore((state) => state.location)
 const startDate = useNewEventStore((state) => state.startDate)
 const endDate = useNewEventStore((state) => state.endDate)
 const startTime = useNewEventStore((state) => state.startTime)
 const endTime = useNewEventStore((state) => state.endTime)
 const allDay = useNewEventStore((state) => state.allDay)

 useEffect(() => {
  getUserSession().then((session) => setSession(session))
 }, [])

 if (!session || !session.accessToken || !session.idToken || !session.refreshToken || !session.expiresIn) {
  return <div>Sign in to create events</div>
 }

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

 const handleSubmit = async () => {
  console.log(event())
 }

 return (
  <div
   onClick={handleSubmit}
   className='cursor-pointer m-auto px-4 py-0.5 rounded-lg bg-black border-2 border-white text-white font-semibold hover:bg-white hover:text-black'>
   Create
  </div>
 )
}

export default Submit
