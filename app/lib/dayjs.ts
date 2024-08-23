import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekday)
dayjs.extend(weekOfYear)

export default dayjs
