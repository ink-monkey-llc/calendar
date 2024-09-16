import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: any[]) {
 return twMerge(clsx(inputs))
}

export function splitDateString(dateString: string): { month: number; year: number } {
 const [month, year] = dateString.split('_')
 return { month: parseInt(month, 10), year: parseInt(year, 10) }
}

export function getNextMonthYear(month: number, year: number): string {
 let nextMonth: number
 let nextYear: number

 if (month === 12) {
  nextMonth = 1 // January
  nextYear = year + 1 // Next year
 } else {
  nextMonth = month + 1 // Next month
  nextYear = year // Same year
 }

 return `${nextMonth}_${nextYear}`
}

export function getLastMonthYear(month: number, year: number): string {
 let lastMonth: number
 let lastYear: number

 if (month === 1) {
  lastMonth = 12 // December
  lastYear = year - 1 // Last year
 } else {
  lastMonth = month - 1 // Last month
  lastYear = year // Same year
 }

 return `${lastMonth}_${lastYear}`
}

export function trunc(input = '', numChars = 8, elipsis = false): string {
 return input.length > numChars ? input.substring(0, numChars - 1) + (elipsis ? '...' : '') : input
}
