import React from 'react'
import { useNewEventStore } from '@/app/lib/zustand/store'
import type { ColorOption, Day } from '@/types/types'
import { CreateIcon } from '../icons/create'
import dayjs from '@/app/lib/dayjs'

function DetailCreateBtn({ currentColor, day }: { currentColor: ColorOption; day: Day }) {
 const setIsCreate = useNewEventStore((state) => state.setIsCreate)
 const setStartDate = useNewEventStore((state) => state.setStartDate)
 const setEndDate = useNewEventStore((state) => state.setEndDate)

 const onClick = () => {
  setIsCreate(true)
  setStartDate(dayjs(day.date).toDate())
  setEndDate(dayjs(day.date).toDate())
 }

 return (
  <div
   onClick={onClick}
   style={{ color: currentColor.text, background: currentColor.value }}
   className='my-1 w-max m-auto text-center px-3 py-0.5 rounded-lg items-center flex gap-1 cursor-pointer hover:scale-105 transition-all'>
   <CreateIcon />
   <div>Create new event</div>
  </div>
 )
}

export default DetailCreateBtn
