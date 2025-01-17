'use client'
import React, { useState } from 'react'
import { HamburgerIcon } from '../icons/hamburger'
import Floating from '../floating'
import MobileCreateDialog from '../create/mobile-create-dialog'
import Colors from '../settings/colors'
import { Logout } from '../icons/logout'
import Zip from './zip'
import { Profile } from './profile'

function MobileMenu({ action }: { action: () => Promise<void> }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='absolute top-3 right-6 tablet:hidden'>
            <Floating
                offsetAmt={4}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                placement='bottom-start'
                target={<HamburgerIcon className='w-8 h-8 opacity-40 hover:opacity-100 transition-all cursor-pointer' />}>
                <div className='bg-gray-950 rounded-lg shadow-lg p-3 z-50 relative flex w-max flex-col items-start'>
                    <MobileCreateDialog />
                    <Zip isMobile={true} />
                    <div className='flex items-center text-lg gap-1'>
                        <Colors isMobile={true} />
                    </div>
                    <Profile isMobile={true} />
                </div>
            </Floating>
        </div>
    )
}

export default MobileMenu
