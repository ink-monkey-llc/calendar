import React from 'react'
import MenuBtns from './menu-btns'
import MobileMenu from './mobile-menu'

function Menu({ action }: { action: () => Promise<void> }) {
 return (
  <div>
   <MobileMenu action={action} /> <MenuBtns />
  </div>
 )
}

export default Menu
