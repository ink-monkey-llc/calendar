import React from 'react'
import CreateDialog from '../create/create-dialog'
import Zip from './zip'
import Colors from '../settings/colors'
import { Logout } from '../icons/logout'
import { signOut } from '@/auth'
import { Avatar } from '../icons/avatar'
import { Profile } from './profile'

function MenuBtns() {
    const handleLogout = async () => {
        'use server'
        await signOut()
    }

    return (
        <div className='absolute gap-2 right-4 tablet:right-8 top-2 hidden tablet:flex'>
            <CreateDialog />
            <Colors />
            <Zip isMobile={false} />
            <Profile isMobile={false} />
        </div>
    )
}

export default MenuBtns
