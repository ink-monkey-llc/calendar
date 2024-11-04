import React from 'react'
import Calendar from '../components/calendar/calendar'
import { redirect } from 'next/navigation'
import { signOut, signIn, auth } from '@/auth'
import Menu from '../components/menu/menu'

async function Cal() {
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
  <div className='relative calendar-wrapper lg-mb:w-max m-auto p-4 pt-2 flex items-start justify-center h-full tablet:max-w-[900px] tablet:w-full desktop:max-w-[1200px] desktop:w-full lg-mb:h-full  lg-mb:min-w-[470px] tablet:h-[650px] desktop:h-[380px]'>
   <Calendar />
   <Menu action={handleAction} />
  </div>
 )
}

export default Cal
