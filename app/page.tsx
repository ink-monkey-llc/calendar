import { auth, signIn, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import { Login } from './components/icons/login'

export default async function Home() {
 const session = await auth()
 if (session) {
  return redirect('/cal')
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
  <form
   action={handleAction}
   className='flex h-[100vh] items-center justify-center'>
   <button className='border-2 border-white cursor-pointer flex gap-2 text-2xl opacity-80 hover:opacity-100 hover:bg-[var(--white25)] transition-all w-max m-auto py-2 px-8 rounded-2xl'>
    Sign in
    <Login className='w-8 h-8 ' />
   </button>
  </form>
 )
}
