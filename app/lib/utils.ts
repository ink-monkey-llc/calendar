import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: any[]) {
    return twMerge(clsx(inputs))
}


export function trunc(input: string, numChars = 8, elipsis = false): string {
    if (!input) return ''
    return input.length > numChars ? input.substring(0, numChars - 1) + (elipsis ? '...' : '') : input
}

export function isJson(str: string) {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}
