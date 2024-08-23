import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

function AuthBtn() {
 const { data: session } = useSession()
 const handleClick = () => {
  if (session) {
   signOut()
  } else {
   signIn()
  }
 }
 console.log(session)
 return (
  <div
   onClick={handleClick}
   className='px-2 py-1 bg-blue-600 rounded-lg text-white w-max cursor-pointer'>
   {session ? 'Sign Out' : 'Sign In'}
  </div>
 )
}

export default AuthBtn
