// 节流
export const throttle = (func, delay) => {
    let timer = null
    let startTime = Date.now()
    return function fn(this, ...args) {
        const curTime = Date.now()
        const remaining = delay - (curTime - startTime)
        const context = this
        clearTimeout(timer)
        if (remaining <= 0) {
            func.apply(context, args)
            startTime = Date.now()
        } else {
            timer = setTimeout(func, remaining)
        }
    }
}