import React from 'react'
import Floating from '../floating'
import Colors from './colors'
import { Gear } from '../icons/gear'

function Settings() {
 return (
  <Floating
   offsetAmt={4}
   target={<Gear className='w-8 h-8 opacity-20 hover:opacity-100 transition-all' />}
   placement='top-end'>
   <div className='  bg-black z-50 relative rounded-xl'>
    <h2 className='border-b border-white/20 text-center text-sm text-white/45 px-2 py-0.5'>Settings</h2>
    <div className='flex flex-col px-2'>
     <Colors />
    </div>
   </div>
  </Floating>
 )
}

export default Settings
