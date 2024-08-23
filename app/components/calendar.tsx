import React from 'react'
import { auth } from '../lib/auth'
import { getGoogleCalendarEvents } from '../lib/calendar'

async function Calendar() {
 const session = await auth()
 if (!session || !session.accessToken) {
  return <div>Sign in to access your calendar</div>
 }
 const events = await getGoogleCalendarEvents(session.accessToken)
 return (
  <div>
   {events.map((event, index) => (
    <div key={index}>{event.summary}</div>
   ))}
  </div>
 )
}

export default Calendar
