import React from 'react'
import CreateContent from './create-content'
import { ColorOption } from '@/types/types'

function DetailCreateContent({ color }: { color: ColorOption }) {
 return (
  <div>
   <h2
    style={{ color: color.text }}
    className='text-2xl pt-5  z-50 relative text-center'>
    Create Event
   </h2>
   <div
    style={{ backgroundColor: color.value }}
    className='absolute top-[32px] left-8 right-[54px] bottom-4 rounded-[60px]'
   />
   <CreateContent color={color} />
  </div>
 )
}

export default DetailCreateContent
