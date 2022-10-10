import { hasOwnProperty } from './common'
import { isObject, isArray } from './is'

// 拼接ws请求数据
export const getParamsData = (command, data) => ({
    command,
    req: data || '',
})

export function deepClone(target) {
    if (!isObject(target)) return target
    return JSON.parse(JSON.stringify(target))
}

export const isFunction = (data) =>
    Object.prototype.toString.call(data) === '[object Function]'

export const getExtend = (current, target) => {
    if (!isObject(current)) return target
    if (!isObject(target)) return current
    if (!isObject(current) && !isObject(target)) return {}
    if (JSON.stringify(target) === '{}') return current
    const tempCurrent = JSON.parse(JSON.stringify(current))
    for (const key in target) {
        if (hasOwnProperty(target, key)) {
            const data = target[key]
            if (!tempCurrent.hasOwnProperty(key)) {
                tempCurrent[key] = data
            } else if (isArray(data)) {
                const tempArr = []
                data.forEach((list) => {
                    const currentData = {
                        ...tempCurrent[key][0],
                        ...list,
                    }
                    tempArr.push(currentData)
                })
                tempCurrent[key] = tempArr
            } else {
                tempCurrent[key] = {
                    ...tempCurrent[key],
                    ...data,
                }
            }
        }
    }
    return tempCurrent
}

// 判断是否是空对象
export const isNullObject = (obj) => {
    if (!obj) return false
    if (isObject(obj)) {
        const params = JSON.stringify(obj)
        if (params === '{}') return true
        return false
    }
    return false
}
