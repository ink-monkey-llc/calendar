import { SVGProps } from 'react'

export function CreateIcon(props: SVGProps<SVGSVGElement>) {
 return (
  <svg
   xmlns='http://www.w3.org/2000/svg'
   width='1em'
   height='1em'
   viewBox='0 0 24 24'
   {...props}>
   <path
    fill='currentColor'
    d='M18 17h-2q-.425 0-.712-.288T15 16t.288-.712T16 15h2v-2q0-.425.288-.712T19 12t.713.288T20 13v2h2q.425 0 .713.288T23 16t-.288.713T22 17h-2v2q0 .425-.288.713T19 20t-.712-.288T18 19zM3 21q-.825 0-1.412-.587T1 19V5q0-.825.588-1.412T3 3h14q.825 0 1.413.588T19 5v4q0 .425-.288.713T18 10t-.712-.288T17 9V8H3v11h12q.425 0 .713.288T16 20t-.288.713T15 21z'></path>
  </svg>
 )
}