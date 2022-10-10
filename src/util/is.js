export const isArray = (obj) =>
    Object.prototype.toString.call(obj) === '[object Array]'
export const isObject = (obj) =>
    Object.prototype.toString.call(obj) === '[object Object]'
export const isString = (obj) =>
    Object.prototype.toString.call(obj) === '[object String]'
export const isNullObject = (obj) => JSON.stringify(obj) === '{}'

export const isNullArrayOrNullObject = (data) =>
    (isArray(data) && !data.length) || isNullObject(data)
