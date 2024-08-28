import Floating from '../floating'
import { ColorPicker } from '../icons/color-picker'
import { colorOptions } from '@/data/color-options'
import ColorOpt from './color-opt'

function Colors() {
 return (
  <Floating
   target={
    <div className='flex gap-1 items-center cursor-pointer'>
     <div className='min-w-4'>
      <ColorPicker />
     </div>
     <p>Colors</p>
    </div>
   }
   placement='left-end'>
   <div className='bg-black z-50 relative rounded-xl p-1 flex flex-col gap-1'>
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
