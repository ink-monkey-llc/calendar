import React from 'react'
import { cn } from '../lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Days_One, Figtree } from 'next/font/google'
import { ArrowRight } from '../components/icons/arrow-right'

const daysOne = Days_One({ subsets: ['latin'], weight: '400' })
const figtree = Figtree({ subsets: ['latin'] })

function HomePage() {
 return (
  <div className='bg-var-bg h-full min-h-[100vh] w-[100vw] overflow-x-hidden'>
   <div className='m-auto border-2 border-var-home-border max-h-[500px] max-w-[900px] rounded-[60px] mt-16 pl-8 flex gap-8 pt-8 overflow-hidden'>
    <div className={cn(daysOne.className, 'flex flex-col gap-6 w-1/2')}>
     <div>
      <h1 className='text-5xl'>The Calendar</h1>
      <p>by Ink Monkey</p>
     </div>
     <div className={cn(figtree.className, 'text-xl flex flex-col gap-4')}>
      <p>Seamlessly integrate your Google Calendar functionality into a slick user interface.</p>
      <p>Includes daily weather information and your calendar events.</p>
     </div>
     <div className='flex flex-col gap-4'>
      <Link
       href='/'
       className={cn(
        figtree.className,
        'bg-var-home-btn rounded-xl py-3 px-6 w-max font-bold text-xl m-auto opacity-80 hover:opacity-100 cursor-pointer flex items-center'
       )}>
       Go to the app
       <ArrowRight className='ml-2' />
      </Link>
      <Link
       className={cn(figtree.className, 'underline m-auto flex justify-center')}
       href='/privacy'>
       Privacy Policy
      </Link>
     </div>
    </div>
    <Image
     className='-mr-[340px] -mb-[200px]'
     alt='screenshot of the calendar app'
     src={'/cal-ss.png'}
     width={800}
     height={600}
    />
   </div>
  </div>
 )
}

export default HomePage
