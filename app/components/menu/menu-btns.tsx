import React from 'react'
import CreateDialog from '../create/create-dialog'
import Colors from '../settings/colors'
import { Logout } from '../icons/logout'

async function MenuBtns({ action }: { action: () => Promise<void> }) {
 return (
  <div className='absolute flex gap-2 right-4 tablet:right-8 top-2'>
   <CreateDialog />
   <Colors />
   <form action={action}>
    <button>
     <Logout className='w-8 h-8 opacity-40 hover:opacity-100 transition-all' />
    </button>
   </form>
  </div>
 )
}

export default MenuBtns
