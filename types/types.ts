import { Session } from 'inspector'
import { decl } from 'postcss'

export type CalendarEvent = {
 kind: string
 etag: string
 id: string
 status: string
 htmlLink: string
 created: string
 updated: string
 summary: string
 description: string
 location: string
 colorId: string
 creator: { email: string; self: boolean }
 organizer: { email: string; self: boolean }
 start: { date: string; dateTime: string; timeZone: string }
 end: { dateTime: string; timeZone: string }
 recurringEventId: string
 originalStartTime: { dateTime: string; timeZone: string }
 iCalUID: string
 sequence: number
 reminders: { useDefault: boolean }
 eventType: string
}

export type Day = {
 date: string
 day: number
 isCurrentMonth: boolean
}

export type TokenSession = Session & { accessToken?: string; idToken?: string; refreshToken?: string }

export type Coords = {
 place_id: number
 licence: string
 boundingbox: string[]
 lat: string
 lon: string
 display_name: string
 class: string
 type: string
 importance: number
}

export type HistWeatherData = {
 latitde: number
 longitude: number
 generationtime_ms: number
 utc_offset_seconds: number
 timezone: string
 timezone_abbreviation: string
 elevation: number
 daily_units: {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  precipitation_sum: string
  precipitation_hours: string
 }
 daily: {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_sum: number[]
  precipitation_hours: number[]
 }
}

export type Weather = {
 latitude: number
 longitude: number
 generationtime_ms: number
 utc_offset_seconds: number
 timezone: string
 timezone_abbreviation: string
 elevation: number
 daily_units: {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  precipitation_probability_max: string
 }
 daily: {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_probability_max: number[]
 }
}

export type FormattedWeather = {
 date: string
 maxTemp: number
 minTemp: number
 precipProb: number
}

export const colorDefault: ColorOption = {
 id: '#3e4e63',
 name: '#3e4e63',
 variable: '#3e4e63',
 value: '#3e4e63',
 text: '#3e4e63',
 ul: '#3e4e63',
}

export type ColorOption = {
 id: string
 name: string
 variable: string
 value: string
 text: string
 ul: string
}

declare module 'react' {
 interface CSSProperties {
  '--alpha'?: string
  '--accent'?: string
  '--accent-hsl'?: string
  '--current'?: string
 }
}

export type Place = {
 name: any
 text: string
 place_id: string
}

export type DateType = {
 date?: string
 dateTime?: string
 timeZone?: string
}

export type Event = {
 start: DateType
 end: DateType
 summary?: string
 description?: string
 location?: string
}
