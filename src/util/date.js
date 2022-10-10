import { fillZero } from '@util/fill-zero'
import { getYearAndMonthAndDay } from '@util/getTime'
import moment from 'moment'

export default moment

export const getWeek = () => {
    const num = moment().format('E')
    return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][num - 1]
}

const fomatterTimestamp = (time = 0) => {
    const timeStamp = 24 * 60 * 60 * 1000 // 一天的时间戳
    const reallyTime = new Date().getTime() - (time + 1) * timeStamp
    return reallyTime
}
export const fomatterDate = day => {
    const timeStamp = fomatterTimestamp(day)
    return moment(timeStamp).format('YYYY/MM/DD')
}

// 近七天
export const navfomatterFn = day => {
    const timeStamp = fomatterTimestamp(day)
    return moment(timeStamp).format('YYYY-MM-DD')
}

// 获取两天时间差
export function dateMinusFn(dateStart, dateEnd) {
    const sdate = new Date(dateStart)
    const now = new Date(dateEnd)
    const days = now.getTime() - sdate.getTime()
    const day = Math.floor(days / (1000 * 60 * 60 * 24))
    return day
}

/**
 * 获取00:00到23:55的明细
 * interval 为间隔 可以设置5 10 15
 */
export const getDayTimeInterval = (interval = 5) => {
    const timeArray = ['00:00']
    const startTime = 0
}

/**
 * 获取间隔分钟数， 以space为间隔， 输出从0: 00 到24： 00 的所有时间段
 * [0: 00, 0: 15, 0: 30....]
 *
 * @param {*} space 间隔时间（分钟）
 */
export function getSpaceTime(space = 5) {
    let hour = 0
    let min = 0
    const spaceArr = []
    space = parseInt(space, 10)
    while (hour < 24) {
        spaceArr.push(`${fillZero(hour)}:${fillZero(min)}`)
        min += space > 0 ? space : -space
        if (min >= 60) {
            hour++
            min -= 60
        }
    }
    return spaceArr
}

export function genTimeTill(
    endtime = new Date().setHours(24, 0, 0, 0),
    interval = 5 * 60 * 1000,
) {
    const arr = []
    const starttime =
        new Date(new Date().toLocaleDateString()).getTime() + interval
    while (starttime <= endtime) {
        arr.unshift((endtime -= interval))
    }
    return arr.map(value => moment(value).format('HH:mm'))
}


// 2015-06
function siblingMonth(yearmonth, nextOrPrev) {
    let yearMonth = yearmonth || ''
    if (yearmonth.length === 7) {
        yearMonth = yearmonth
    } else if (yearmonth.length === 10) {
        yearMonth = yearmonth.substring(0, 7)
    } else {
        yearMonth = getYearAndMonthAndDay().substring(0, 7)
    }
    if (!nextOrPrev) nextOrPrev = 'next'
    let time = `${yearMonth}-01`
    time = time.split('-')
    time = time.join('/')
    time = new Date(time)
    const lasttime = new Date(time.getFullYear(), time.getMonth() - 1, 1)
    const lastmonth = `${lasttime.getFullYear()}-${fillZero(
        lasttime.getMonth() + 1,
    )}`
    const nexttime = new Date(time.getFullYear(), time.getMonth() + 1, 1)
    const nextmonth = `${nexttime.getFullYear()}-${fillZero(
        nexttime.getMonth() + 1,
    )}`
    return nextOrPrev === 'next' ? nextmonth : lastmonth
}


// 获得当前年月
export function getnowYearMonth() {
    const yearmonth = getYearAndMonthAndDay().split('-')
    return `${yearmonth[0]}-${yearmonth[1]}`
}

// 获取前一天
export function prevDay(date) {
    // 把2016-10-20 改成2016/10/20
    // ie8下 new Date("2016-10-20")会得出null   只能new Date("2016/10-20")
    if (date) {
        const realDate = +new Date(date)
        if (!realDate) {
            date = date.replace(/\\-/g, '/')
            date = +new Date(date)
        } else {
            date = realDate
        }
    } else {
        date = +new Date()
    }
    date = date ? +new Date(date) : +new Date()
    let yestoday = date - 24 * 60 * 60 * 1000
    yestoday = new Date(yestoday)
    let month = yestoday.getMonth() + 1
    if (month < 10) month = `0${String(month)}`
    let day = yestoday.getDate()
    if (day < 10) day = `0${String(day)}`
    return [yestoday.getFullYear(), month, day].join('-')
}

/**
 * 获取指定日期的前几天
 * 从beginDate往前推几天(days)
 * 如果beginDate缺省，则默认从今天算起
 * containBeginDate : 是否包含beginDate
 */
export function prevDays(beginDate, dayCount, containBeginDate, ...args) {
    const result = []
    const len = args.length
    const innerBeginDate = len > 1 ? args[0] : getYearAndMonthAndDay()
    let innerDayCount = len > 1 ? args[1] : args[0]
    if (!innerBeginDate || !innerDayCount) return result
    if (len < 3) {
        containBeginDate = false
    } else {
        containBeginDate = !!containBeginDate
    }

    function getPrev(date) {
        const prev = prevDay(date)
        result.push(prev)
        innerDayCount--
        if (innerDayCount > 0) getPrev(prev)
    }

    getPrev(innerBeginDate)

    if (containBeginDate) {
        result.unshift(beginDate)
        return result
    }

    return result
}
// 获取后一天
export function nextDay(date) {
    if (date) {
        const realDate = +new Date(date)
        if (!realDate) {
            date = date.replace(/\\-/g, '/')
            date = +new Date(date)
        } else {
            date = realDate
        }
    } else {
        date = +new Date()
    }
    date = date ? +new Date(date) : +new Date()
    let nextDay = date + 24 * 60 * 60 * 1000
    nextDay = new Date(nextDay)

    let innerDay = nextDay.getDate()
    if (innerDay < 10) {
        innerDay = `0${innerDay}`
    }
    let innerMonth = nextDay.getMonth() + 1
    if (innerMonth < 10) {
        innerMonth = `0${innerMonth}`
    }
    return [nextDay.getFullYear(), innerMonth, innerDay].join('-')
}

// 获取下一个月
export function nextMonth(yearmonth, ifContainDay) {
    if (!ifContainDay) return siblingMonth(yearmonth, 'next')
    const date = yearmonth.length === 10 ? yearmonth : `${yearmonth}-01`
    const arr = date.split('-')
    const year = arr[0] // 获取当前日期的年份
    const month = arr[1] // 获取当前日期的月份
    const day = arr[2] // 获取当前日期的日
    let days = new Date(year, month, 0)
    days = days.getDate() // 获取当前日期中的月的天数
    let year2 = year
    let month2 = parseInt(month, 10) + 1
    if (month2 === 13) {
        year2 = parseInt(year2, 10) + 1
        month2 = 1
    }

    let day2 = day
    let days2 = new Date(year2, month2, 0)
    days2 = days2.getDate()
    if (day2 > days2) {
        day2 = days2
    }
    if (month2 < 10) {
        month2 = `0${month2}`
    }
    return `${year2}-${month2}-${day2}`
}

/**
 * 获取昨天
 */
export function getYesterday() {
    const date = new Date()
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    m = fillZero(m)
    let d = date.getDate()
    d = fillZero(d)
    return `${y}-${m}-${d}`
}

/**
 * 获得相对当前周AddWeekCount个周的起止日期
 * AddWeekCount为0代表当前周  为-1代表上一个周  为1代表下一个周以此类推
 */
export function getWeekStartAndEnd(AddWeekCount) {
    // 起止日期数组
    const startStop = []
    // 一天的毫秒数
    const millisecond = 1000 * 60 * 60 * 24
    // 获取当前时间
    let currentDate = new Date()
    // 相对于当前日期AddWeekCount个周的日期
    currentDate = new Date(
        currentDate.getTime() + millisecond * 7 * AddWeekCount,
    )
    // 返回date是一周中的某一天
    const week = currentDate.getDay()
    // 返回date是一个月中的某一天
    // 减去的天数
    const minusDay = week !== 0 ? week - 1 : 6
    // 获得当前周的第一天
    const currentWeekFirstDay = new Date(
        currentDate.getTime() - millisecond * minusDay,
    )
    // 获得当前周的最后一天
    const currentWeekLastDay = new Date(
        currentWeekFirstDay.getTime() + millisecond * 6,
    )
    // 添加至数组
    startStop.push(getYearAndMonthAndDay(currentWeekFirstDay))
    startStop.push(getYearAndMonthAndDay(currentWeekLastDay))
    return startStop
}

/**
 * 获得相对当月AddMonthCount个月的起止日期
 * AddMonthCount为0 代表当月 为-1代表上一个月 为1代表下一个月 以此类推
 */
export function getMonthStartAndEnd(AddMonthCount) {
    // 起止日期数组
    const startStop = []
    // 获取当前时间
    let currentDate = new Date()
    let month = currentDate.getMonth() + AddMonthCount
    if (month < 0) {
        const n = parseInt(-month / 12, 10)
        month += n * 12
        currentDate.setFullYear(currentDate.getFullYear() - n)
    }

    currentDate = new Date(currentDate.setMonth(month))
    // 获得当前月份0-11
    const currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    const currentYear = currentDate.getFullYear()
    // 获得上一个月的第一天
    const currentMonthFirstDay = new Date(currentYear, currentMonth, 1)
    // 获得上一月的最后一天
    const currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0)
    // 添加至数组
    startStop.push(getYearAndMonthAndDay(currentMonthFirstDay))
    startStop.push(getYearAndMonthAndDay(currentMonthLastDay))
    // 返回
    return startStop
}
