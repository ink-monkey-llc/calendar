import React from 'react'

function Summary({ summary, setSummary }: { summary: string; setSummary: React.Dispatch<React.SetStateAction<string>> }) {
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
