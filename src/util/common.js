import { fmtNumber } from '@util/formaterNumber'
import _ from 'lodash'
import { isNullArrayOrNullObject } from './is'
const WEEK_STR = '周'
const XQ_STR = '星期'

export const dateStrFormat = (str, mode) => {
    const [YYYY, MM, DD] = str.split('-')
    const dateFormatMap = {
        daily: `${MM}/${DD}`,
        weekly: `${YYYY}年第${MM}周`,
        monthly: `${YYYY}年${MM}月`,
    }
    return dateFormatMap[mode]
}
// 深拷贝
export const cloneDeep = (obj) => _.cloneDeep(obj)

// 仅返回自己的属性
export const hasOwnProperty = (obj, key) =>
    ({}.hasOwnProperty.call(obj, key))

// 将指令中的.-_剔除，并进行首字母大写的转换
export const commandTranform = (command) =>
    command
        .split(/\.|-|_/g)
        .map(word => _.upperFirst(word))
        .join('')

/**
 * 高阶函数，封装某个api方法，返回一个新方法，此新方法具有缓存请求的功能
 * @param {function} fn
 * @param {string} fnName
 * @return {function} new api fn
 */
export const ERROR_TEXT = '请求出错，请稍后重试'
export const delay = (data, time = 1000) =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            if (data && typeof data !== 'string') {
                resolve(data)
            } else {
                reject(new Error(data || '未知错误'))
            }
        }, time),
    )

export function getWeekDay(type) {
    const day = new Date().getDay()
    const formatStr = type === WEEK_STR ? WEEK_STR : XQ_STR
    const weekMap = {
        0: `${formatStr}天`,
        1: `${formatStr}一`,
        2: `${formatStr}二`,
        3: `${formatStr}三`,
        4: `${formatStr}四`,
        5: `${formatStr}五`,
        6: `${formatStr}六`,
    }
    return weekMap[day]
}
// 判断图片是否加载
export const imgLoad = (dom) =>
    new Promise((resolve, reject) => {
        dom.onload = () => {
            resolve({
                status: 'success',
            })
        }
        dom.onerror = () => {
            reject({
                status: 'error',
            })
        }
    })

// 趋势转换，正值加+，负值加-
export const trendFilter = (rate) => {
    if(!rate) return '0%'
    if(rate>0) return `+${rate}%`
    return `${rate}%`
}

// 比率转换
export const rateFilter = (rate) => {
    let result = '100%'
    if (rate <= 0) {
        result = `0%`
    } else if (rate > 0 && rate <= 100) {
        result = `${rate}%`
    }
    return result
}

// 超长年龄格式化
export const ageFilter = (age) => {
    if (age.indexOf('+') !== -1) {
        return `${age.replace('+', '')}岁以上`
    }
    return `${age}岁`
}

// 数值格式化
export const handleFmtNumber = (
    sourceData,
    keys,
) => {
    if (Array.isArray(sourceData) && sourceData.length > 0) {
        sourceData.forEach(sourceItem => {
            keys.forEach((key) => {
                const itemData = sourceItem[key]
                if (itemData !== null && itemData !== undefined) {
                    sourceItem[`${key}Fmt`] = fmtNumber(itemData).commaResult
                }
            })
        })
    } else {
        const sourceKeys = Object.keys(sourceData).filter(key =>
            keys.includes(key),
        )
        sourceKeys.forEach(key => {
            sourceData[`${key}Fmt`] = fmtNumber(sourceData[key]).commaResult
        })
    }
}

export const handleFmtRate = (
    sourceData,
    keys,
) => {
    if (!isNullArrayOrNullObject(sourceData) && keys.length > 0) {
        if (Array.isArray(sourceData)) {
            sourceData.forEach(sourceItem => {
                keys.forEach(key => {
                    const itemData = sourceItem[key]
                    if (itemData !== null && itemData !== undefined) {
                        sourceItem[`${key}Fmt`] = rateFilter(itemData)
                    }
                })
            })
        } else {
            const sourceKeys = Object.keys(sourceData).filter(key =>
                keys.includes(key),
            )
            sourceKeys.forEach(key => {
                sourceData[`${key}Fmt`] = rateFilter(sourceData[key])
            })
        }
    }
}

export const handleFmtAge = (
    sourceData,
    keys,
) => {
    if (!isNullArrayOrNullObject(sourceData) && keys.length > 0) {
        if (Array.isArray(sourceData)) {
            sourceData.forEach(sourceItem => {
                keys.forEach(key => {
                    const itemData = sourceItem[key]
                    if (itemData !== null && itemData !== undefined) {
                        sourceItem[`${key}Fmt`] = ageFilter(itemData)
                    }
                })
            })
        } else {
            const sourceKeys = Object.keys(sourceData).filter(key =>
                keys.includes(key),
            )
            sourceKeys.forEach(key => {
                sourceData[`${key}Fmt`] = ageFilter(sourceData[key])
            })
        }
    }
}

export const setScenicId = (scenicId) => {
    // 待办：触发event('store.saveScenicId')存入Vuex Store

    // 存入localStorage
    localStorage.setItem('SCENICID', scenicId)
}
