import React from 'react'
import { signIn, signOut, auth } from '@/auth'

async function AuthBtn() {
 const session = await auth()
 const handleAction = async () => {
  'use server'
  if (session) {
   await signOut()
  } else {
   await signIn()
  }
 }
 return (
  <form action={handleAction}>
   <button className='px-2 py-1 bg-blue-600 rounded-lg text-white w-max cursor-pointer'>{session ? 'Sign Out' : 'Sign In'}</button>
  </form>
 )
}

export default AuthBtn
