// 返回对象的Keys或者Values
export function getObjKeysOrValues(obj={}, type) {
    obj = obj || {}
    return Object[type](obj)
}

export const repeat = (func, ms) => {
    return window.setTimeout(() => {
        func()
        repeat(func, ms)
    }, ms)
}

/**
 *
 *
 * @param {*} fn
 * @param {*} timestamp
 * @return {*} 
 */
export const setIntervalNow = (fn, timestamp)  => {
    fn()
    return setIntervalNow(fn, timestamp)
}

/**
 *判断该字符串是否为合法的JSON格式
 *
 * @param {*} str
 * @return {*} boolean result
 */
const isJSON = (str) => {
    if (str === '') {
        return false
    }

    if (typeof str === 'string') {
        try {
            const obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
                return true
            }
        } catch (error) {
            console.error(error, str)
        }
    }
    return false
}


export default {
    isJSON,
    setIntervalNow,
}
