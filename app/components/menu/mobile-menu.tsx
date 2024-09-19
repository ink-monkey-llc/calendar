'use client'
import React, { useState } from 'react'
import { cn } from '@/app/lib/utils'
import { HamburgerIcon } from '../icons/hamburger'
import { useFloating, offset, flip, shift, autoUpdate, useClick, useDismiss, useInteractions, useTransitionStyles } from '@floating-ui/react'
import CreateDialog from '../create/create-dialog'
import Colors from '../settings/colors'
import { Logout } from '../icons/logout'

function MobileMenu({ action }: { action: () => Promise<void> }) {
 const [isOpen, setIsOpen] = useState(false)
 const { refs, floatingStyles, context } = useFloating<HTMLButtonElement>({
  open: isOpen,
  placement: 'bottom-start',
  onOpenChange: setIsOpen,
  middleware: [
   offset({
    mainAxis: 5,
   }),
   flip(),
   shift(),
  ],
  whileElementsMounted: autoUpdate,
 })

 const click = useClick(context)
 const dismiss = useDismiss(context)
 const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])
 const { isMounted, styles } = useTransitionStyles(context)

 return (
  <div
   className={cn('absolute top-2 right-4')}
   ref={refs.setReference}
   {...getReferenceProps()}>
   <HamburgerIcon
    className='w-8 h-8 opacity-40 hover:opacity-100 transition-all cursor-pointer'
    onClick={() => setIsOpen(!open)}
   />
   {isMounted && (
    <div
     {...getFloatingProps()}
     ref={refs.setFloating}
     style={{ ...styles, ...floatingStyles }}
     className='bg-gray-950 rounded-lg shadow-lg p-3 z-50 relative flex w-max flex-col items-start'>
     <div className='flex items-center text-lg gap-1'>
      <CreateDialog isMobile={true} />
      Create event
     </div>
     <div className='flex items-center text-lg gap-1'>
      <Colors />
      Colors
     </div>

     <form action={action}>
      <button className='flex items-center text-lg gap-1'>
       <Logout className='w-8 h-8 opacity-40 hover:opacity-100 transition-all' />
       Logout
      </button>
     </form>
    </div>
   )}
  </div>
 )
}

export default MobileMenu
