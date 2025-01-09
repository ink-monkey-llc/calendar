'use client'
import { useEffect, useState } from "react"
import { ColorOption } from "@/types/types"
import { colorDefault } from "@/types/types"
import Link from "next/link"
import { CrownIcon } from "../icons/crown"
import { useLocalStorage, useWindowSize } from "usehooks-ts"
import { cn } from "@/app/lib/utils"


function PremiumButton({ collapsible }: { collapsible: boolean }) {
    const [color, setColor] = useLocalStorage<ColorOption>('color', colorDefault)
    const [currentColor, setCurrentColor] = useState<ColorOption>(colorDefault)
    const [isShown, setIsShown] = useState(false)
    const { width } = useWindowSize()
    const isCollapsed = width < 780 && collapsible
    useEffect(() => {
        setCurrentColor(color)
        setIsShown(true)
    }, [color])
    return (
        <Link href='/premium' style={{ backgroundColor: currentColor.value, color: currentColor.text }} className={cn("px-2 rounded-xl flex text-sm font-bold items-center gap-2 opacity-90 transition-all hover:opacity-100", !isShown && 'opacity-0')}>
            <CrownIcon color={currentColor.text} className="w-6 h-6" />
            {!isCollapsed && <p>Get Ad-Free</p>}
        </Link>
    )
}

export default PremiumButton