import React from 'react'
import { EditIcon } from '../icons/edit'

function EditEvent() {
 const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation()
 }
 return (
  <div
   onClick={(e) => handleEdit(e)}
   className='p-0.5 rounded-lg hover:bg-white/40 text-white transition-all w-max cursor-pointer'>
   <EditIcon className='w-4 h-4' />
  </div>
 )
}

export default EditEvent
