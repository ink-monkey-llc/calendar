import React from 'react'
import dayjs from '@/app/lib/dayjs'
import { useWindowSize } from 'usehooks-ts'
import { cn } from '@/app/lib/utils'
import { ArrowLeft } from '../icons/arrow-left'
import { ArrowRight } from '../icons/arrow-right'
import { useNewEventStore } from '@/app/lib/zustand/store'

function MonthSelect() {

    const setCurrent = useNewEventStore((state) => state.setCurrent)
    const current = useNewEventStore((state) => state.current)
    const currentMonth = dayjs(current).month()

    const selectedMonth = dayjs()
        .month(currentMonth)
        .format('MMMM')

    const { width } = useWindowSize()
    const isMobile = width < 465

    return (
        <div className='relative flex items-center justify-center gap-3 text-2xl  mx-auto w-full'>
            <a
                className={cn('text-xs text-white/60 absolute top-1 left-4 underline hover:text-white', isMobile && 'left-2')}
                href='/privacy'>
                Privacy Policy
            </a>
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
