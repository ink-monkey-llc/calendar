import React from 'react'
import CreateDialog from '../create/create-dialog'
import Colors from '../settings/colors'
import { Logout } from '../icons/logout'
import { signOut } from '@/auth'

function MenuBtns() {
 const handleLogout = async () => {
  'use server'
  await signOut()
 }

 return (
  <div className='absolute gap-2 right-4 tablet:right-8 top-2 hidden tablet:flex'>
   <CreateDialog />
   <Colors />
   <form action={handleLogout}>
    <button>
     <Logout className='w-8 h-8 opacity-40 hover:opacity-100 transition-all' />
    </button>
   </form>
  </div>
 )
}

export default MenuBtns
