import React, { Suspense } from 'react'
import Calendar from '../components/calendar/calendar'
import { redirect } from 'next/navigation'
import { splitDateString } from '@/app/lib/utils'
import { signOut, signIn, auth } from '@/auth'
import dayjs from '../lib/dayjs'
import Colors from '../components/settings/colors'
import { Logout } from '../components/icons/logout'
import CreateDialog from '../components/create/create-dialog'

async function Cal({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
 const initYear = Number(dayjs().format('YYYY'))
 const initMonth = Number(dayjs().format('M'))
 const { month, year } = searchParams.m ? splitDateString(searchParams.m as string) : { month: initMonth, year: initYear }

 const session = await auth()

 if (!session) {
  return redirect('/')
 }

 const handleAction = async () => {
  'use server'
  if (session) {
   await signOut()
  } else {
   await signIn()
  }
 }

 return (
  <div className='relative calendar-wrapper lg-mb:w-max m-auto p-4 pt-2 flex items-start justify-center h-[100vh] lg-mb:h-full'>
   <Calendar
    month={month}
    year={year}
   />
   <div className='absolute flex gap-2 right-4 tablet:right-8 top-2'>
    <CreateDialog />
    <Colors />
    <form action={handleAction}>
     <button>
      <Logout className='w-8 h-8 opacity-40 hover:opacity-100 transition-all' />
     </button>
    </form>
   </div>
  </div>
 )
}

export default Cal
