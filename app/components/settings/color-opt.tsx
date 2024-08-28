'use client'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { ColorOption } from '@/types/types'

function ColorOpt({ opt }: { opt: ColorOption }) {
 const [color, setColor] = useLocalStorage<ColorOption>(`color`, opt)
 const handleSelect = () => {
  setColor(opt)
 }
 return (
  <div
   onClick={handleSelect}
   key={opt.id}
   className='w-6 h-6 rounded-full cursor-pointer outline outline-2 outline-offset-1 outline-transparent hover:outline-white/70 transition-all'
   style={{ backgroundColor: opt.value }}
  />
 )
}

export default ColorOpt
