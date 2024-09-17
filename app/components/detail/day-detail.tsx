import { Dialog, DialogTrigger, DialogContent, DialogContainer } from '@/app/components/motion/dialog'
import DetailContent from './detail-content'
import { CalendarEvent, ColorOption, Day, FormattedWeather } from '@/types/types'

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
     className='relative w-[500px] h-[400px] m-auto'>
     <div className='relative p-6 detail-bg h-full w-full left-2 tablet:left-auto '>
      <div
       style={{ backgroundColor: currentColor.value }}
       className='absolute top-[32px] left-8 right-[54px] bottom-4 rounded-[60px]'
      />
      <DetailContent
       todayWeather={todayWeather}
       events={events}
       day={day}
      />
     </div>
    </DialogContent>
   </DialogContainer>
  </Dialog>
 )
}

export default DayDetail
