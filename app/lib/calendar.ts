'use server'
import { getUserSession } from './googleAuth'
import { google } from 'googleapis'

async function googleAuth(accessToken: string, idToken: string, refreshToken: string, expiresIn: number) {
 const auth = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 })
 auth.setCredentials({ access_token: accessToken, id_token: idToken, refresh_token: refreshToken, expiry_date: expiresIn })
 return auth
}

export async function getGoogleCalendarEvents(accessToken: string, idToken: string, refreshToken: string, expiresIn: number) {
 const auth = await googleAuth(accessToken, idToken, refreshToken, expiresIn)
 const calendar = google.calendar({ version: 'v3', auth, errorRedactor: false })
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

export async function insertEvent(accessToken: string, idToken: string, refreshToken: string, expiresIn: number, event: any) {
 const auth = await googleAuth(accessToken, idToken, refreshToken, expiresIn)
 const calendar = google.calendar({ version: 'v3', auth, errorRedactor: false })
 try {
  const response = await calendar.events.insert({
   calendarId: 'primary',
   requestBody: event,
  })
  //   console.log(response)
  return response
 } catch (e) {
  console.log(e)
 }
}
