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

export const firstDayOfMonth = (month: number, year: number) =>
 dayjs()
  .month(month)
  .year(year)
  .date(1)
  .format('YYYY-MM-DD')


export function getWeekday(date: string) {
 return dayjs(date).weekday()
}


export function makeNextMonthDays(year: number, month: number, calSize: number) {
 const thisMonthDays = daysInMonth(year, month)
 const num = calSize - thisMonthDays

 const days = (num: number) =>
  [...Array(num)].map((day, i) => {
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

 return days(num)
}
export const days = (year: number, month: number, calSize: number) => {
 const currMonthDays = makeCurrMonthDays(year, month)
 const nextMonthDays = makeNextMonthDays(year, month, calSize)

 return [...currMonthDays, ...nextMonthDays]
}

export const makeEventDates = (startDate: string, endDate: string, startTime: string, endTime: string, allDay: boolean) => {
 const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD')
 const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD')
 const addTime = (date: string, time: string) => {
  return dayjs(`${date}T${time}`).format()
 }
 let startObj = {}
 let endObj = {}
 if (allDay) {
  startObj = {
   date: formattedStartDate,
  }
  endObj = {
   date: formattedEndDate,
  }
 }
 if (!allDay) {
  startObj = {
   dateTime: addTime(formattedStartDate, startTime),
  }
  endObj = {
   dateTime: addTime(formattedEndDate, endTime),
  }
 }
 return { start: startObj, end: endObj }
}

export const processDateTime = (date?: string | null, dateTime?: string | null) => {
 let processedDate: Date = dayjs().toDate()
 let processedTime: string = ''
 if (date) {
  processedDate = dayjs(date).toDate()
 } else {
  processedDate = dayjs(dateTime).toDate()
  processedTime = dayjs(dateTime).format('hh:mm')
 }
 return { date: processedDate, time: processedTime }
}
