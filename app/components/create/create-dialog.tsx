'use client'
import React, { useState, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Dialog, DialogTrigger, DialogContent, DialogContainer } from '@/app/components/motion/dialog'
import { CreateIcon } from '../icons/create'
import { cn } from '@/app/lib/utils'
import { ColorOption, colorDefault } from '@/types/types'
import CreateContent from './create-content'

function CreateDialog({ isMobile = false }: { isMobile?: boolean }) {
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
    {isMobile ? (
     <div className='flex items-center text-lg gap-1'>
      <CreateIcon className={cn('w-6 h-6 opacity-40 hover:opacity-100 transition-all cursor-pointer')} />
     </div>
    ) : (
     <CreateIcon className={cn('w-8 h-8 opacity-40 hover:opacity-100 transition-all cursor-pointer')} />
    )}
   </DialogTrigger>
   <DialogContainer>
    <DialogContent className='relative w-[500px] h-[450px] m-auto'>
     <div className='relative p-6 detail-bg h-full w-full left-2 tablet:left-auto '>
      <h2 className='text-2xl pt-5  z-50 relative text-center'>Create Event</h2>
      <div
       style={{ backgroundColor: currentColor.value }}
       className='absolute top-[32px] left-8 right-[54px] bottom-4 rounded-[60px]'
      />
      <CreateContent color={currentColor} />
     </div>
    </DialogContent>
   </DialogContainer>
  </Dialog>
 )
}

export default CreateDialog
