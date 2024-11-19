import React from 'react'
import { cn } from '@/app/lib/utils'
import Image from 'next/image'
import { CloseIcon } from '../icons/close'
import { luckiest_guy } from '@/fonts'
import ProdCard from './prod-card'
import { adDataLeft, adDataRight } from '@/data/ad-data'
import { useNewEventStore } from '@/app/lib/zustand/store'

function AdContent() {
 const setIsAd = useNewEventStore((state) => state.setIsAd)
 return (
  <div className='absolute top-[32px] left-8 right-[54px] bottom-4 rounded-[60px] bg-var-bg pr-4'>
   <div
    onClick={() => setIsAd(false)}
    className='mx-12 mt-2 flex items-center rounded-md bg-var-bg-sec hover:bg-black py-0.5 px-1 w-max gap-1 cursor-pointer'>
    <CloseIcon className='text-red-700 w-4 h-4 ' />
    <div className='text-sm'>Close Ad</div>
   </div>
   <div className='grid grid-cols-2 gap-4'>
    <div className='flex flex-col gap-2 ml-6 '>
     <Image
      className='mt-2'
      alt='Ink Monkey Logo'
      src={'/logo/im-logo.png'}
      width={180}
      height={180}
     />
     {adDataLeft.map((product) => (
      <ProdCard
       key={product.title[0]}
       product={product}
      />
     ))}
    </div>
    <div className='flex flex-col gap-2'>
     {adDataRight.map((product) => (
      <ProdCard
       key={product.title[0]}
       product={product}
      />
     ))}
    </div>
   </div>
   <div className='w-full flex justify-center mt-4'>
    <a
     target='_blank'
     rel='noopener noreferrer'
     className={cn(' text-3xl text-var-ad-text hover:text-var-ad-hover text-center m-auto outline-none', luckiest_guy.className)}
     href='https://www.ink-monkey.com/'>
     ink-monkey.com
    </a>
   </div>
  </div>
 )
}

export default AdContent
