import React from 'react'
import { auth } from '@/auth'
import { getGoogleCalendarEvents } from '../lib/calendar'

async function Calendar() {
 const session = await auth()
 if (!session || !session.accessToken || !session.idToken || !session.refreshToken || !session.expiresIn) {
  return <div>Sign in to access your calendar</div>
 }
 const events = await getGoogleCalendarEvents(session.accessToken, session.idToken, session.refreshToken, session.expiresIn)
 if (!events || events.length === 0) {
  return <div>No events found</div>
 }
 return (
  <div>
   {events.map((event, index) => (
    <div key={index}>
     <p>{event.summary}</p>
     <p>{event.start?.date}</p>
    </div>
   ))}
  </div>
 )
}

export default Calendar
