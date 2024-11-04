import React from 'react'
import Image from 'next/image'
import { cn } from '@/app/lib/utils'
import { AdDataItem } from '@/data/ad-data'
import { luckiest_guy } from '@/fonts'

function ProdCard({ product }: { product: AdDataItem }) {
 return (
  <a
   target='_blank'
   rel='noopener noreferrer'
   className='outline-none'
   href={product.link}>
   <div
    className={cn('flex flex-col items-center rounded-2xl p-2 hover:brightness-125', product.flex === 'row' && 'flex-row')}
    style={{ backgroundColor: product.bg }}>
    <Image
     alt='Pirate vinyl decal'
     src={`/ad/${product.img}`}
     width={product.width}
     height={product.height}
    />
    <div className={cn('flex flex-col items-center justify-center')}>
     {product.title.map((text) => (
      <p
       key={text}
       className={cn(luckiest_guy.className, 'text-2xl', product.textSmall && 'text-lg')}
       style={{ color: product.text, lineHeight: 1 }}>
       {text}
      </p>
     ))}
    </div>
   </div>
  </a>
 )
}

export default ProdCard
