import { Dialog, DialogTrigger, DialogContent, DialogContainer } from '@/app/components/motion/dialog'
import MobileDetailContent from './mobile-detail-content'
import MobileEditContent from '../edit/mobile-edit-content'
import { useNewEventStore } from '@/app/lib/zustand/store'
import { CalendarEvent, ColorOption, Day, FormattedWeather } from '@/types/types'

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
      className='relative  bg-black h-full w-full rounded-[67px] border-4 '>
      <div
       style={{ backgroundColor: currentColor.value }}
       className='absolute inset-0 rounded-[60px]'
      />
      {isEdit ? (
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
