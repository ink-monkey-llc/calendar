import React from 'react'
import Calendar from '../components/calendar/calendar'
import { redirect } from 'next/navigation'
import { splitDateString } from '@/app/lib/utils'
import { signOut, signIn, auth } from '@/auth'
import dayjs from '../lib/dayjs'
import Colors from '../components/settings/colors'
import AuthBtn from '../components/auth-btn'
import { Logout } from '../components/icons/logout'
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
  <div className='relative calendar-wrapper w-max p-4 pt-2 flex items-end '>
   <Calendar
    month={month}
    year={year}
   />
   <div className='absolute flex gap-2 right-8 top-2'>
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
