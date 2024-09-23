'use client'
import React, { useState, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Dialog, DialogTrigger, DialogContent, DialogContainer } from '@/app/components/motion/dialog'
import { CreateIcon } from '../icons/create'
import { cn } from '@/app/lib/utils'
import { ColorOption, colorDefault } from '@/types/types'
import MobileCreateContent from './mobile-create-content'

function MobileCreateDialog() {
 const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
 const [currentColor, setCurrentColor] = useState<ColorOption>(colorDefault)
 useEffect(() => {
  setCurrentColor(color)
 }, [color])
 return (
  <Dialog
   transition={{
    type: 'spring',
    bounce: 0.1,
    duration: 0.3,
   }}>
   <DialogTrigger>
    <div className='flex items-center text-lg gap-1'>
     <CreateIcon className={cn('w-6 h-6 opacity-40 hover:opacity-100 transition-all cursor-pointer')} />
     New event
    </div>
   </DialogTrigger>
   <DialogContainer>
    <DialogContent className='relative w-[500px] h-[450px] m-2'>
     <div
      style={{ borderColor: currentColor.value }}
      className='relative  bg-black h-full w-full rounded-[67px] border-4 '>
      <h2 className='text-2xl pt-5  z-50 relative text-center'>Create Event</h2>
      <div
       style={{ backgroundColor: currentColor.value }}
       className='absolute top-0 left-0 right-0 bottom-0 rounded-[60px]'
      />
      <MobileCreateContent color={currentColor} />
     </div>
    </DialogContent>
   </DialogContainer>
  </Dialog>
 )
}

export default MobileCreateDialog
