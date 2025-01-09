'use server'
import { EventType } from '../components/inputs/submit'
import { google } from 'googleapis'
import dayjs from './dayjs'
import type { Event } from '@/types/types'

async function googleAuth(accessToken: string, idToken: string, refreshToken: string, expiresIn: number) {
  try {
    const auth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
    auth.setCredentials({ access_token: accessToken, id_token: idToken, refresh_token: refreshToken, expiry_date: expiresIn })
    return auth
  } catch (e) {
    console.log('auth err', e)
  }
}

export async function getGoogleCalendarEvents(accessToken: string, idToken: string, refreshToken: string, expiresIn: number, current: string) {
  const min = dayjs(current).startOf('month').toISOString()
  const auth = await googleAuth(accessToken, idToken, refreshToken, expiresIn)
  const calendar = google.calendar({ version: 'v3', auth, errorRedactor: false })
  try {
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: min,
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    })
    return events.data.items || []
  } catch (e) {
    console.log('get events err', e)
  }
}

export async function getGoogleCalendarEventsByDate(accessToken: string, idToken: string, refreshToken: string, expiresIn: number, current: string) {
  const auth = await googleAuth(accessToken, idToken, refreshToken, expiresIn)
  const calendar = google.calendar({ version: 'v3', auth, errorRedactor: false })
  try {
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: dayjs(current).startOf('day').toISOString(),
      timeMax: dayjs(current).endOf('day').toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    })
    return events.data.items || []
  } catch (e) {
    console.log('get events err', e)
  }
}

export async function getEvent(accessToken: string, idToken: string, refreshToken: string, expiresIn: number, eventId: string) {
  const auth = await googleAuth(accessToken, idToken, refreshToken, expiresIn)
  const calendar = google.calendar({ version: 'v3', auth, errorRedactor: false })
  try {
    const response = await calendar.events.get({
      calendarId: 'primary',
      eventId: eventId,
    })
    return response.data
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
    return response
  } catch (e) {
    console.log(e)
  }
}

export async function deleteEvent(accessToken: string, idToken: string, refreshToken: string, expiresIn: number, eventId: string) {
  const auth = await googleAuth(accessToken, idToken, refreshToken, expiresIn)
  const calendar = google.calendar({ version: 'v3', auth, errorRedactor: false })
  try {
    const response = await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    })
    return response
  } catch (e) {
    console.log(e)
  }
}

export async function updateEvent(accessToken: string, idToken: string, refreshToken: string, expiresIn: number, event: EventType, eventId: string) {
  const auth = await googleAuth(accessToken, idToken, refreshToken, expiresIn)
  const calendar = google.calendar({ version: 'v3', auth, errorRedactor: false })
  try {
    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      requestBody: event,
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
