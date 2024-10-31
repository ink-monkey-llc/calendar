import { Dialog, DialogTrigger, DialogContent, DialogContainer } from '@/app/components/motion/dialog'
import MobileDetailContent from './mobile-detail-content'
import MobileEditContent from '../edit/mobile-edit-content'
import { useNewEventStore } from '@/app/lib/zustand/store'
import { CalendarEvent, ColorOption, Day, FormattedWeather } from '@/types/types'
import DetailCreateContent from '../create/detail-create-content'
import MobileCreateContent from '../create/mobile-create-content'

function MobileDayDetail({
 children,
 day,
 events,
 currentColor,
 todayWeather,
}: {
 children: React.ReactNode
 day: Day
 events: CalendarEvent[]
 currentColor: ColorOption
 todayWeather?: FormattedWeather | null
}) {
 const isEdit = useNewEventStore((state) => state.isEdit)
 const isCreate = useNewEventStore((state) => state.isCreate)
 return (
  <Dialog
   transition={{
    type: 'spring',
    bounce: 0.1,
    duration: 0.3,
   }}>
   <DialogTrigger>{children}</DialogTrigger>
   <DialogContainer>
    <DialogContent className='relative w-full h-[450px] m-2'>
     <div
      style={{ borderColor: currentColor.value }}
      className='relative mob-detail-bg bg-black h-full w-full rounded-[67px] border-4 '>
      <div
       style={{ backgroundColor: currentColor.value }}
       className='absolute inset-0 rounded-[60px]'
      />
      {isCreate ? (
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
      ) : isEdit ? (
       <MobileEditContent color={currentColor} />
      ) : (
       <MobileDetailContent
        todayWeather={todayWeather}
        events={events}
        day={day}
       />
      )}
     </div>
    </DialogContent>
   </DialogContainer>
  </Dialog>
 )
}

export default MobileDayDetail
