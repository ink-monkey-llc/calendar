import { init } from 'next/dist/compiled/webpack/webpack'
import { create } from 'zustand'

export type State = {
 summary: string
 description: string
 location: string
 startDate: Date
 endDate: Date
 startTime: string
 endTime: string
 allDay: boolean
}

export type Action = {
 setSummary: (summary: string) => void
 setDescription: (description: string) => void
 setLocation: (location: string) => void
 setStartDate: (startDate: Date) => void
 setEndDate: (endDate: Date) => void
 setStartTime: (startTime: string) => void
 setEndTime: (endTime: string) => void
 setAllDay: (allDay: boolean) => void
 reset: () => void
}

const initialState: State = {
 summary: '',
 description: '',
 location: '',
 startDate: new Date(),
 endDate: new Date(),
 startTime: new Date().toString(),
 endTime: new Date().toString(),
 allDay: true,
}

export const useNewEventStore = create<Action & State>()((set) => ({
 ...initialState,
 setSummary: (summary: string) => set({ summary }),
 setDescription: (description: string) => set({ description }),
 setLocation: (location: string) => set({ location }),
 setStartDate: (startDate: Date) => set({ startDate }),
 setEndDate: (endDate: Date) => set({ endDate }),
 setStartTime: (startTime: string) => set({ startTime }),
 setEndTime: (endTime: string) => set({ endTime }),
 setAllDay: (allDay: boolean) => set({ allDay }),
 reset: () => set(initialState),
}))
