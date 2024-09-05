'use client'
import React, { useEffect, useState } from 'react'
import { ColorOption, colorDefault } from '@/types/types'
import { colorOptions } from '@/data/color-options'
import { useLocalStorage } from 'usehooks-ts'
import { inter } from '@/fonts'

function ColorWrapper({ children }: { children: React.ReactNode }) {
 const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
 const [currentColor, setCurrentColor] = useState<ColorOption>()

 useEffect(() => {
  setCurrentColor(color)
 }, [color])
 return (
  <body
   className={inter.className}
   style={{ '--accent-hsl': currentColor?.variable  }}>
   {children}
  </body>
 )
}

export default ColorWrapper
