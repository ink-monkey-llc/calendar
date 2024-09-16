import React from 'react'
import { useNewEventStore } from '@/app/lib/zustand/store'

function Summary() {
 const summary = useNewEventStore((state) => state.summary)
 const setSummary = useNewEventStore((state) => state.setSummary)

 return (
  <input
   className=' w-full bg-transparent border-b py-2 border-white/20 focus-within:border-white/80'
   id='summary'
   value={summary}
   onChange={(e) => setSummary(e.target.value)}
   name='summary'
   type='text'
   placeholder='Enter event title'
  />
 )
}

export default Summary
