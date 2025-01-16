import { auth, signIn, signOut } from '@/auth'
import GoogleIcon from './components/icons/google'
import { redirect } from 'next/navigation'
import { Login } from './components/icons/login'

export default async function Home() {
    const session = await auth()

    if (session) {
        console.log(session)
        return redirect('/cal')
    }

    const handleAction = async () => {
        'use server'
        if (session) {
            await signOut()
        } else {
            await signIn('google')
        }
    }
    return (
        <div className='h-[100vh] flex flex-col items-center justify-center'>
            <form
                action={handleAction}
                className='group flex flex-col gap-2 items-center justify-center'>
                <p className='opacity-80 group-hover:opacity-100 transition-all'>To view your calendar,</p>
                <button className='border-2 bg-var-bg-dark border-white cursor-pointer flex gap-4 text-2xl opacity-80 hover:opacity-100 hover:bg-var-bg-sec transition-all w-max m-auto p-4 rounded-2xl'>
                    <GoogleIcon className='w-8 h-8' />
                    Sign in with Google
                    <Login className='w-8 h-8 ' />
                </button>
            </form>
            <a
                className='text-xs text-white/60 underline mt-4 hover:text-white'
                href='/privacy'>
                Privacy Policy
            </a>
        </div>
    )
}
