'use client'
import React, { useState } from 'react'
import { useFloating, offset, flip, shift, autoUpdate, useClick, useDismiss, useInteractions, useTransitionStyles, Placement } from '@floating-ui/react'
import { cn } from '@/app/lib/utils'

type Props = {
 children: React.ReactNode
 target: React.ReactNode
 placement: Placement
 offsetAmt?: number
 targetClassName?: string
 childrenClassName?: string
}

function Colors({ children, target, placement, offsetAmt = 10, targetClassName, childrenClassName }: Props) {
 const [isOpen, setIsOpen] = useState(false)
 const { refs, floatingStyles, context } = useFloating<HTMLButtonElement>({
  open: isOpen,
  placement: placement,
  onOpenChange: setIsOpen,
  middleware: [
   offset({
    mainAxis: offsetAmt,
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
  <>
   <div
    className={cn('cursor-pointer right-4 bottom-4', targetClassName)}
    ref={refs.setReference}
    {...getReferenceProps()}>
    {target}
   </div>
   {isMounted && (
    <div
     className={cn('relative z-40', childrenClassName)}
     {...getFloatingProps()}
     ref={refs.setFloating}
     style={{ ...styles, ...floatingStyles }}>
     {children}
    </div>
   )}
  </>
 )
}

export default Colors
