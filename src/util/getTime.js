import { fillZero } from './fill-zero'
export function getMonth() {
    // 获取当前月的第一天
    let nowDate = new Date()
    let start = nowDate.setDate(1)
    // 获取当前月的最后一天
    let currentMonth = nowDate.getMonth()
    const nextMonth = ++currentMonth
    const nextMonthFirstDay = new Date(nowDate.getFullYear(), nextMonth, 1).getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const end = nextMonthFirstDay - oneDay

    const startDate = getYearAndMonthAndDay(start) // 日期变换
    const endDate = getYearAndMonthAndDay(end) // 日期变换

    return {
        startDate,
        endDate
    }
}
export function getYearAndMonthAndDay(date) {
    const nowDate = getNowDate(date)
    const year = nowDate.getFullYear()
    let month = nowDate.getMonth() + 1
    let day = nowDate.getDate()
    const monthStr = fillZero(month)
    const dayStr = fillZero(day)
    return `${year}-${monthStr}-${dayStr}`
}
function getNowDate(date=''){
    if(!date) return new Date()
    return new Date(date)
}
export function getOneDayTime() {
    let oneDayTimeArr = []
    let h = 0
    let hStr = ''
    let m = 0
    while (h < 24) {
        if (h < 10) {
            hStr = '0' + h
        } else {
            hStr = h + ''
        }
        m = 0
        h += 1
        while (m < 60) {
            let str = ''
            if (m < 10) {
                str = '0' + m
            } else {
                str = m + ''
            }
            oneDayTimeArr.push(`${hStr}:${str}`)
            m += 1
        }
    }
    return oneDayTimeArr
}
