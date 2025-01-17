import React from 'react'
import dayjs from '@/app/lib/dayjs'
import { useQueryClient } from '@tanstack/react-query'
import { useWindowSize } from 'usehooks-ts'
import { cn } from '@/app/lib/utils'
import { ArrowLeft } from '../icons/arrow-left'
import { ArrowRight } from '../icons/arrow-right'
import { useNewEventStore } from '@/app/lib/zustand/store'
import PremiumButton from '../premium/premium-button'
import { Session } from 'next-auth'

function MonthSelect({ session }: { session: Session }) {

    const setCurrent = useNewEventStore((state) => state.setCurrent)
    const current = useNewEventStore((state) => state.current)
    const currentMonth = dayjs(current).month()
    const queryClient = useQueryClient()
    const selectedMonth = dayjs()
        .month(currentMonth)
        .format('MMMM')

    const { width } = useWindowSize()
    const isSmall = width < 780

    return (
        <div className='relative flex items-center justify-center gap-3 text-2xl  mx-auto w-full'>
            {/* <a
                className={cn('text-xs text-white/60 absolute top-1 left-4 underline hover:text-white', isMobile && 'left-2')}
                href='/privacy'>
                Privacy Policy
            </a> */}
            {!session.user?.isPremium && <div className={cn('absolute top-1 left-4', isSmall && 'top-2')}>
                <PremiumButton collapsible={true} />
            </div>}
            <div
                onClick={() => {
                    setCurrent(dayjs(current).subtract(1, 'month').format('YYYY-MM-DD'))
                }}
                className='cursor-pointer '>
                <ArrowLeft className='w-6 h-6' />
            </div>
            <span className='cursor-pointer flex '>{selectedMonth}</span>
            <div
                onClick={() => {
                    setCurrent(dayjs(current).add(1, 'month').format('YYYY-MM-DD'))
                }}
                className='cursor-pointer '>
                <ArrowRight className='w-6 h-6' />
            </div>
        </div>
    )
}


export default MonthSelect
