'use client'
import React, { useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import MenuBtns from './menu-btns'
import MobileMenu from './mobile-menu'

function Menu({ action }: { action: () => Promise<void> }) {
 const { width } = useWindowSize()
 const isMobile = width < 780
 return <div>{isMobile ? <MobileMenu action={action} /> : <MenuBtns action={action} />}</div>
}

export default Menu
