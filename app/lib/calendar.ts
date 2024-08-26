'use server'
import { google } from 'googleapis'

export async function getGoogleCalendarEvents(accessToken: string) {
 const auth = new google.auth.OAuth2()
 auth.setCredentials({ access_token: accessToken })
 const calendar = google.calendar({ version: 'v3', auth })
 try {
  const events = await calendar.events.list({
   calendarId: 'primary',
   timeMin: new Date().toISOString(),
   maxResults: 100,
   singleEvents: true,
   orderBy: 'startTime',
  })
  return events.data.items || []
 } catch (e) {
  console.log(e)
 }
}
