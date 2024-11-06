import React from 'react'
import Spinner from '../components/spinner/spinner'

function Loading() {
 return (
  <div className='w-full h-[100vh] flex justify-center items-center'>
   <Spinner className='w-12 h-12' />
  </div>
 )
}

export default Loading
