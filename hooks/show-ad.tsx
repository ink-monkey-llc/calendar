import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useNewEventStore } from '@/app/lib/zustand/store'
const DELAY_IN_MS = 60 * 1000 // 5 minutes

export function useShowComponentOnce() {
 const isAd = useNewEventStore((state) => state.isAd)
 const setIsAd = useNewEventStore((state) => state.setIsAd)
 const [lastShown, setLastShown] = useLocalStorage('lastShown', 0)
 useEffect(() => {
  const now = Date.now()

  if (!lastShown || now - lastShown > DELAY_IN_MS) {
   setIsAd(true)
   setLastShown(now)
  } else {
   setIsAd(false)
  }
 }, [])

 return isAd
}
