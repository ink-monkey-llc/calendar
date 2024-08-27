import dayjs from './dayjs'

export function daysInMonth(year: number, month: number) {
 return dayjs().month(month).year(year).daysInMonth()
}

export function makeCurrMonthDays(year: number, month: number) {
 const numDays = daysInMonth(year, month)
 const days = [...Array(numDays)].map((day, i) => {
  return {
   date: dayjs()
    .month(month)
    .year(year)
    .date(i + 1)
    .format('YYYY-MM-DD'),
   day: i + 1,
   isCurrentMonth: true,
  }
 })
 return days
}

const currentMonthDays = (year: number, month: number) => makeCurrMonthDays(year, month)

export function getWeekday(date: string) {
 return dayjs(date).weekday()
}

export function makePrevMonthDays(year: number, month: number) {
 const firstDayWeekday = getWeekday(currentMonthDays(year, month)[0].date)
 const prevMonth = dayjs().month(month).year(year).subtract(1, 'month')
 const visibleDaysLastMonth = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1
 const prevMonthLastMonday = dayjs(currentMonthDays(year, month)[0].date).subtract(visibleDaysLastMonth, 'day').date()
 const days = [...Array(visibleDaysLastMonth)].map((day, i) => {
  return {
   date: dayjs()
    .year(prevMonth.year())
    .month(prevMonth.month())
    .date(prevMonthLastMonday + i)
    .format('YYYY-MM-DD'),
   day: prevMonthLastMonday + i,
   isCurrentMonth: false,
  }
 })
 return days
}

export function makeNextMonthDays(year: number, month: number) {
 const lastDayWeekday = getWeekday(`${year}-${month}-${currentMonthDays(year, month).length}`)

 const visibleDaysNextMonth = lastDayWeekday ? 7 - lastDayWeekday : lastDayWeekday

 const days = [...Array(visibleDaysNextMonth)].map((day, i) => {
  return {
   date: dayjs()
    .year(year)
    .month(month + 1)
    .date(i + 1)
    .format('YYYY-MM-DD'),
   day: i + 1,
   isCurrentMonth: false,
  }
 })
 return days
}
export const days = (year: number, month: number) => {
 const currMonthDays = makeCurrMonthDays(year, month - 1)
 const nextMonthDays = makeNextMonthDays(year, month - 1)
 const prevMonthDays = makePrevMonthDays(year, month - 1)

 return [...prevMonthDays, ...currMonthDays, ...nextMonthDays]
}
