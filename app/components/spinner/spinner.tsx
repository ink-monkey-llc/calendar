import React from 'react'
import './spinner.css'
import { cn } from '@/app/lib/utils'

function Spinner({ className = '' }) {
 return <div className={cn('loader', className)} />
}

export default Spinner
