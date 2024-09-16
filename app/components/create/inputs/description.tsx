import React, { useState } from 'react'
import { useNewEventStore } from '@/app/lib/zustand/store'

function Description() {
 const [active, setActive] = useState(false)
 const description = useNewEventStore((state) => state.description)
 const setDescription = useNewEventStore((state) => state.setDescription)

 const handleCancel = () => {
  setActive(false)
  setDescription('')
 }

 return (
  <div className='mt-2'>
   {!active ? (
    <div
     onClick={() => setActive(true)}
     className='cursor-pointer text-sm mt-2 border border-white/20 rounded-lg w-max px-3 py-0.5 hover:bg-white/20'>
     Add description
    </div>
   ) : (
    <>
     <div className='flex items-center justify-between'>
      <label
       htmlFor='description'
       className='block text-sm font-medium text-white'>
       Description
      </label>
      <div
       onClick={handleCancel}
       className='text-xs cursor-pointer rounded-lg px-2 hover:bg-white/20'>
       Cancel
      </div>
     </div>
     <textarea
      id='description'
      name='description'
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className='rounded-lg w-full text-sm bg-transparent border border-white/20 focus-within:border-white/80 px-1'
     />
    </>
   )}
  </div>
 )
}

export default Description
