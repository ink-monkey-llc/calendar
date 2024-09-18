import React from 'react'
import { EditIcon } from '../icons/edit'
import { useNewEventStore } from '@/app/lib/zustand/store'

function EditEvent({ eventId }: { eventId: string }) {
 const setIsEdit = useNewEventStore((state) => state.setIsEdit)
 const setEventId = useNewEventStore((state) => state.setEventId)
 const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation()
  setEventId(eventId)
  setIsEdit(true)
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
