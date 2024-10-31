import React from 'react'
import CreateContent from './create-content'
import { ColorOption } from '@/types/types'
import { cn } from '@/app/lib/utils'
import { useWindowSize } from 'usehooks-ts'

function DetailCreateContent({ color }: { color: ColorOption }) {
 const { width } = useWindowSize()
 const isMobile = width < 465
 return (
  <div>
   <h2
    style={{ color: color.text }}
    className={cn('text-2xl pt-5  z-50 relative text-center', isMobile && 'pt-8')}>
    Create Event
   </h2>
   <div
    style={{ backgroundColor: color.value }}
    className={cn(' absolute top-[32px] left-8 right-[54px] bottom-4 rounded-[60px]')}
   />
   <CreateContent color={color} />
  </div>
 )
}

export default DetailCreateContent
