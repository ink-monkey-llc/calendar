import { useEffect } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogContainer } from '@/app/components/motion/dialog'
import { cn } from '@/app/lib/utils'
import DetailContent from './detail-content'
import { useNewEventStore } from '@/app/lib/zustand/store'
import { CalendarEvent, ColorOption, Day, FormattedWeather } from '@/types/types'
import EditContent from '../edit/edit-content'
import DetailCreateContent from '../create/detail-create-content'
import AdContent from '../ad/ad-content'
import { useLocalStorage, useWindowSize } from 'usehooks-ts'
import { useShowComponentOnce } from '@/hooks/show-ad'

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
    //  const isAd = useShowComponentOnce()
    const { width } = useWindowSize()
    const isEdit = useNewEventStore((state) => state.isEdit)
    const isCreate = useNewEventStore((state) => state.isCreate)
    const setIsAd = useNewEventStore((state) => state.setIsAd)
    const isAd = useNewEventStore((state) => state.isAd)
    const DELAY_IN_MS = 300000 // 5 minutes
    //  const DELAY_IN_MS = 1000 // 1 second
    const isMobile = width < 465

    const [lastShown, setLastShown] = useLocalStorage('lastShown', 0)

    useEffect(() => {
        const now = Date.now()
        //   console.log(now - lastShown)
        if (now - lastShown > DELAY_IN_MS) {
            setIsAd(true)
            setLastShown(now)
        } else {
            setIsAd(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAd])

    // const tempIsAd = true

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
                        ) : isAd ? (
                            <AdContent />
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
