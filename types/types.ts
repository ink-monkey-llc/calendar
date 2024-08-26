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
 start: { dateTime: string; timeZone: string }
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
