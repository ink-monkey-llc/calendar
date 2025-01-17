'use client'
import React, { Suspense } from 'react'
import MonthSelect from './month-select'
import dynamic from 'next/dynamic'
import { useNewEventStore } from '@/app/lib/zustand/store'
import { Session } from 'next-auth'
// import Days from './days'

function Calendar({ session }: { session: Session }) {
    const Days = dynamic(() => import('./days'), { ssr: false })

    return (
        <div className='w-full max-w-[1200px] mx-auto'>
            <MonthSelect session={session} />
            <Days
            />
        </div>
    )
}

export default Calendar
