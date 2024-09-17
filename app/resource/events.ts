import { getUserSession } from '@/app/lib/googleAuth'
import { getGoogleCalendarEvents } from '../lib/calendar'

export async function getEvents() {
 const session = await getUserSession()
 if (!session || !session.accessToken || !session.idToken || !session.refreshToken || !session.expiresIn) {
  throw new Error('No session found')
 }
 const events = await getGoogleCalendarEvents(session.accessToken, session.idToken, session.refreshToken, session.expiresIn)
 if (!events || events.length === 0) {
  throw new Error('No events found')
 }
 return events
}

export async function createEvent(event: any) {
 const session = await getUserSession()
 if (!session || !session.accessToken || !session.idToken || !session.refreshToken || !session.expiresIn) {
  throw new Error('No session found')
 }
 const response = await fetch('/api/event', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify({
   event,
   session,
  }),
 })
 if (response.status === 201) {
  return response.json()
 } else {
  throw new Error('Error creating event')
 }
}
