import { Dialog, DialogTrigger, DialogContent, DialogContainer } from '@/app/components/motion/dialog'
import { cn } from '@/app/lib/utils'
import DetailContent from './detail-content'
import { useNewEventStore } from '@/app/lib/zustand/store'
import { CalendarEvent, ColorOption, Day, FormattedWeather } from '@/types/types'
import EditContent from '../edit/edit-content'
import DetailCreateContent from '../create/detail-create-content'
import { useWindowSize } from 'usehooks-ts'

function DayDetail({
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
 const { width } = useWindowSize()
 const isEdit = useNewEventStore((state) => state.isEdit)
 const isCreate = useNewEventStore((state) => state.isCreate)
 const isMobile = width < 465
 return (
  <Dialog
   transition={{
    type: 'spring',
    bounce: 0.1,
    duration: 0.3,
   }}>
   <DialogTrigger>{children}</DialogTrigger>
   <DialogContainer>
    <DialogContent
     style={{
      borderRadius: '12px',
     }}
     className={cn('relative w-[500px] h-[450px] m-auto', isMobile && 'w-full')}>
     <div className={cn('relative p-6 detail-bg h-full w-full left-2 tablet:left-auto', isMobile && 'mob-detail-bg p-2 pl-3')}>
      <div
       style={{ backgroundColor: currentColor.value }}
       className={cn('absolute top-[32px] left-8 right-[54px] bottom-4 rounded-[60px]', isMobile && 'top-[20px] left-[20px] right-[38px]')}
      />
      {isCreate ? (
       <DetailCreateContent color={currentColor} />
      ) : isEdit ? (
       <EditContent color={currentColor} />
      ) : (
       <DetailContent
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

export default DayDetail
