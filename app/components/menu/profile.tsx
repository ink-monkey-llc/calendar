'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react';

import { Avatar } from "../icons/avatar";
import Floating from '../floating'
import { cn } from '@/app/lib/utils';
import { Logout } from '../icons/logout';
export function Profile({ isMobile }: { isMobile: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session } = useSession()
    const handleLogout = async () => {
        await signOut()
    }
    return <Floating
        offsetAmt={4}
        placement='bottom-end'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        target={
            <div className={cn('cursor-pointer h-full flex items-center', isMobile && 'flex justify-between w-full items-center gap-1')}><Avatar className={cn('w-6 h-6 opacity-40 hover:opacity-100 transition-all', !isMobile && 'w-7 h-7')} /> {isMobile && <p>Profile</p>}</div>}
    >
        <div className='bg-gray-950 rounded-lg shadow-lg py-4 z-50 relative flex w-max flex-col gap-2 items-start'>
            <div className='text-sm text-white/80 px-3'>{session?.user?.email}</div>
            <p className='text-sm text-white/60 px-3 bg-gray-900 py-1 w-full'>Your subscription: {session?.user?.isPremium ? 'Premium' : 'Free with ads'}</p>
            <form className='w-full' action={handleLogout}>
                <button className='bg-gray-900 group px-3 py-1 m-auto rounded-lg flex items-center justify-center gap-2'>
                    <Logout className='w-6 h-6 opacity-60 group-hover:opacity-100 transition-all' />
                    <div className='text-sm  text-white/60 group-hover:text-white/100 transition-all'>Logout</div>
                </button>
            </form>
        </div>
    </Floating>
}   