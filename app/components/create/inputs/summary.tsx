import React from 'react'

function Summary() {
 return (
  <input
   className=' w-full bg-transparent border-b py-2 border-white/20 focus-within:border-white/80'
   id='summary'
   name='summary'
   type='text'
   placeholder='Enter event title'
  />
 )
}

export default Summary
