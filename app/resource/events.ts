import { getUserSession } from '@/app/lib/googleAuth'
import { getEvent, getGoogleCalendarEvents } from '../lib/calendar'

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

export async function fetchEvent(eventId: string) {
 const session = await getUserSession()
 if (!session || !session.accessToken || !session.idToken || !session.refreshToken || !session.expiresIn) {
  throw new Error('No session found')
 }
 const event = await getEvent(session.accessToken, session.idToken, session.refreshToken, session.expiresIn, eventId)
 if (!event) {
  throw new Error('No event found')
 }
 return event
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

export async function callDeleteEvent(eventId: string) {
 const session = await getUserSession()
 if (!session || !session.accessToken || !session.idToken || !session.refreshToken || !session.expiresIn) {
  throw new Error('No session found')
 }
 const response = await fetch('/api/event', {
  method: 'DELETE',
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify({
   eventId,
   session,
  }),
 })
 if (response.status === 200) {
  return response.json()
 } else {
  throw new Error('Error deleting event')
 }
}
