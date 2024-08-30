import Floating from '../floating'
import { ColorPicker } from '../icons/color-picker'
import { colorOptions } from '@/data/color-options'
import ColorOpt from './color-opt'

function Colors() {
 return (
  <Floating
   offsetAmt={4}
   target={
    <div className='flex gap-1 items-center cursor-pointer'>
     <div className='min-w-8'>
      <ColorPicker className='w-8 h-8 opacity-40 hover:opacity-100 transition-all' />
     </div>
    </div>
   }
   placement='left-end'>
   <div className='bg-black z-50 relative rounded-xl p-1 flex  gap-1'>
    {colorOptions.map((opt) => (
     <ColorOpt
      key={opt.id}
      opt={opt}
     />
    ))}
   </div>
  </Floating>
 )
}

export default Colors
