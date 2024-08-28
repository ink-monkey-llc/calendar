'use client'
import { ColorOption } from '@/types/types'
import { colorOptions } from '@/data/color-options'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { inter } from '@/fonts'

function ColorWrapper({ children }: { children: React.ReactNode }) {
 const [color, setColor] = useLocalStorage<ColorOption>('color', colorOptions[0])
 return (
  <body
   className={inter.className}
   style={{ '--accent-hsl': color.variable }}>
   {children}
  </body>
 )
}

export default ColorWrapper
