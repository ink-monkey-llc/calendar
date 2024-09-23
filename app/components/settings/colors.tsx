import Floating from '../floating'
import { colorOptions } from '@/data/color-options'
import { cn } from '@/app/lib/utils'
import ColorOpt from './color-opt'
import { Palette } from '../icons/palette'

function Colors({ isMobile = false }: { isMobile?: boolean }) {
 return (
  <Floating
   offsetAmt={14}
   target={
    <div className={cn('flex gap-1 items-center cursor-pointer')}>
     <div className={cn('min-w-8', isMobile && 'min-w-6')}>
      <Palette className={cn('w-8 h-8 opacity-40 hover:opacity-100 transition-all', isMobile && 'w-6 h-6')} />
     </div>
     {isMobile && <p>Colors</p>}
    </div>
   }
   placement='left-end'>
   <div className={cn('bg-black z-50 relative rounded-xl p-1 flex  gap-1', isMobile && 'flex-col bg-gray-950')}>
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
