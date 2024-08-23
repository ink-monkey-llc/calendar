import dayjs from './dayjs'

const initYear = Number(dayjs().format('YYYY'))
const initMonth = Number(dayjs().format('M'))

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

const currentMonthDays = makeCurrMonthDays(2024, 9)

export function getWeekday(date: string) {
 return dayjs(date).weekday()
}

export function makePrevMonthDays(year: number, month: number) {
 const firstDayWeekday = getWeekday(currentMonthDays[0].date)
 const prevMonth = dayjs().month(month).year(year).subtract(1, 'month')
 const visibleDaysLastMonth = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1
 const prevMonthLastMonday = dayjs(currentMonthDays[0].date).subtract(visibleDaysLastMonth, 'day').date()
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
}
