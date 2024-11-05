import React from 'react'
import Link from 'next/link'
import { cn } from '../lib/utils'
import { Days_One, Figtree } from 'next/font/google'
import Image from 'next/image'

const daysOne = Days_One({ subsets: ['latin'], weight: '400' })
const figtree = Figtree({ subsets: ['latin'] })

function PrivacyPolicy() {
 return (
  <div className='p-8 w-[100vw] '>
   <div className='flex gap-2'>
    <Image
     src={'/icon_192.png'}
     width={50}
     height={50}
     alt='icon'
    />
    <div className={cn(daysOne.className)}>
     <h1 className='text-2xl'>The Calendar</h1>
     <p className='text-xs'>by Ink Monkey</p>
    </div>
   </div>
   <div className=' w-full tablet:w-max mx-auto'>
    <Link
     href='/'
     className='-mt-8 bg-var-home-btn rounded-xl py-3 px-6 w-max font-bold text-xl opacity-80 hover:opacity-100 cursor-pointer flex items-center ml-auto'>
     Back
    </Link>
    <div className={cn(figtree.className, 'mt-2 border border-var-home-border rounded-xl w-full tablet:w-max flex flex-col gap-2 mx-auto')}>
     <div className='p-4'>
      <h2 className='font-semibold text-xl'>Privacy Policy</h2>
      <p className='text-sm'>Effective Date: November 5th 2024</p>
     </div>
     <div className='max-w-[700px] flex flex-col gap-2 m-auto'>
      <p className='bg-var-bg-sec px-4'>
       Your privacy is important to us. This Privacy Policy outlines how our app collects, uses, and protects your data in accordance with Google’s policies and
       requirements. By using this app, you agree to the terms of this policy.
      </p>
      <div className='flex flex-col gap-4 p-4'>
       <div className='flex flex-col gap-2'>
        <p className='font-semibold text-lg'>1. Data Collection and Use</p>
        <p className='col-span-11 '>
         This app uses Google OAuth to allow users to sign in with their Google accounts and access their Google Calendar events. Upon authorization, the app
         fetches your Google Calendar events to display them alongside relevant weather data in a custom user interface.
        </p>
        <ul className='list-outside list-disc ml-4 gap-2 flex flex-col'>
         <li>{`Temporary Data Storage: The app does not store any of your data on external servers or databases. All fetched calendar data is stored locally in your
       browser's memory, which is erased once you close the app.`}</li>
         <li>
          Scope of Access: The app only requests permissions necessary to display your calendar events and to enable you to create, edit, and delete events in
          your own Google Calendar. We do not access any other personal information
         </li>
        </ul>
       </div>
       <div className='flex flex-col gap-2'>
        <p className='font-semibold text-lg'>2. No Data Retention</p>
        <p className='col-span-11 '>
         Your calendar data is only accessed when you are actively using the app. Upon closing the app or signing out, all calendar data is deleted from the
         browser memory and is only accessible through your Google Calendar or by signing into the app. The app does not retain any user data. after your
         session ends.
        </p>
       </div>
       <div className='flex flex-col gap-2'>
        <p className='font-semibold text-lg'>3. Data Security</p>
        <p className='col-span-11 '>
         We prioritize your data security and use Google’s OAuth 2.0 for authentication, which provides a secure sign-in experience without compromising your
         credentials. By limiting data storage to your browser’s local memory, we aim to minimize any security risks associated with external data storage.
        </p>
       </div>
       <div className='flex flex-col gap-2'>
        <p className='font-semibold text-lg'>4. Data Sharing</p>
        <p className='col-span-11 '>
         We do not share, sell, or transfer your information to any third parties. The app only accesses your Google Calendar data to display and manage events
         within your account, and it does not store or transmit any data outside of your session.
        </p>
       </div>
       <div className='flex flex-col gap-2'>
        <p className='font-semibold text-lg'>5. Changes to This Policy</p>
        <p className='col-span-11 '>
         {` We may update this Privacy Policy to reflect changes in our practices or legal requirements. When we make changes, the "Effective Date" at the top will be updated accordingly.`}
        </p>
       </div>
       <div className='flex flex-col gap-2'>
        <p className='font-semibold text-lg'>6. Contact Us</p>
        <p className='col-span-11 '>If you have any questions about this Privacy Policy, please contact us at inkmonkeyllc@gmail.com.</p>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default PrivacyPolicy
