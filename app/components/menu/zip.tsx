'use client'
import React from 'react'
import { QueryClient } from '@tanstack/react-query'
import { cn } from '@/app/lib/utils'
import { useLocalStorage } from 'usehooks-ts'
import Floating from '../floating'
import { Pin } from '../icons/pin'
import { Weather } from '../icons/weather'
import { useNewEventStore } from '@/app/lib/zustand/store'

function Zip({ isMobile }: { isMobile: boolean }) {
 const queryClient = new QueryClient()
 const [zip, setZip] = useLocalStorage<string>('zip', '')
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setZip(e.target.value)
  queryClient.invalidateQueries({ queryKey: ['weather'] })
 }
 return (
  <Floating
   offsetAmt={4}
   placement='bottom-start'
   target={
    <div className={cn('cursor-pointer', isMobile && 'flex justify-between w-full items-center gap-1')}>
     <Weather className={cn('w-6 h-6 opacity-40 hover:opacity-100 transition-all', !isMobile && 'w-8 h-8')} />
     {isMobile && <div className=' text-white text-lg'>Location</div>}
    </div>
   }>
   <div className='bg-gray-950 rounded-lg shadow-lg p-3 z-50 relative flex w-max flex-col gap-2 items-start'>
    <div className='text-sm w-full text-center'>Enter your zip code for weather information</div>
    <div className='flex justify-center items-center gap-2 w-full'>
     <input
      value={zip}
      onChange={handleChange}
      className='bg-gray-900 w-full text-white/80 rounded-lg p-2 '
      placeholder='Zip code'
     />
     <div className='px-4 py-1 border-2 border-white/40 rounded-lg cursor-pointer'>Done</div>
    </div>
   </div>
  </Floating>
 )
}

export default Zip
