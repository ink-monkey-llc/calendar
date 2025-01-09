'use client'
import { useState, useEffect } from "react"
import { CrownIcon } from "../icons/crown"
import { cn } from "@/app/lib/utils"
import PurchaseButton from "./purchase-button"
import { ColorOption } from "@/types/types"
import { useLocalStorage } from "usehooks-ts"
import { colorDefault } from "@/types/types"
function PremiumCard() {
    const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
    const [currentColor, setCurrentColor] = useState<ColorOption>(colorDefault)
    const [isShowing, setIsShowing] = useState(false)
    useEffect(() => {
        setCurrentColor(color)
        setIsShowing(true)
    }, [color])
    if (!isShowing) return null
    return (
        <div style={{ backgroundColor: currentColor.value, color: currentColor.text }} className="w-max rounded-xl">
            <div className='flex flex-col items-center p-2'>
                <CrownIcon className="w-24 h-24" />
                <p className="text-xl font-bold">Lifetime Premium Ad-Free</p>
            </div>
            <div style={{ borderColor: color.value }} className='flex flex-col items-center p-2 bg-var-bg border-4 rounded-b-xl'>
                <p className="text-5xl font-bold text-var-white py-4">$0.99</p>
                <p className='text-var-white max-w-48 text-center'>One charge for lifetime ad-free premium access.</p>
                <PurchaseButton color={color} />
                <p className="text-var-white text-xs underline">Restore Previous Purchase</p>
            </div>
        </div>
    )
}

export default PremiumCard