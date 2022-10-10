/**
 * 消抖函数    对于一个开销大却会不停调用的函数，让其间隔n秒才调用一次。函数是发生在触发之后。常见的例子就是获取窗口大小，input监听值，监听滚动事件等
实现方式：每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法。
缺点：如果事件在规定的时间间隔内被不断的触发，则调用方法会被不断的延迟。
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 是否立即调用。默认false
 */
export function debounce(func, wait, immediate) {
    // immediate默认为false
    let timeout, args, context, timestamp, result

    function later() {
        // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
        const last = Date.now() - timestamp
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function fn(this, ...args) {
        context = this
        timestamp = Date.now()
        // 第一次调用该方法时，且immediate为true，则调用func函数
        const callNow = immediate && !timeout
        // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}
