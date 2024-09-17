import { getUserSession } from '@/app/lib/googleAuth'
import { getGoogleCalendarEvents } from '../lib/calendar'
import { get } from 'http'

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
