import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(customParseFormat)
dayjs.extend(weekday)
dayjs.extend(weekOfYear)

export default dayjs
