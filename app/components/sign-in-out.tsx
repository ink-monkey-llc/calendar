'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import AuthBtn from './auth-btn'

function SignInOut() {
 return (
  <SessionProvider>
   <AuthBtn />
  </SessionProvider>
 )
}

export default SignInOut
