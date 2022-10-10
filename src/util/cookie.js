// 设置cookie,并设置终止日期
function setCookie(cookieName, cookieValue) {
    let expire = new Date(new Date().getTime() + 2 * 60 * 60000) // 有效期2小时
    let expireDate = `;expires=${expire.toUTCString()}`
    // 用escape()函数进行编码，它能将一些特殊符号使用十六进制表示，例如空格将会编码为“20%”，
    // 从而可以存储于cookie值中，而且使用此种方案还可以避免中文乱码的出现
    document.cookie = `${cookieName}=${escape(cookieValue)}${expireDate}`
}

// 清除所有cookie
function removeCookie() {
    const keys = document.cookie.match(/[^ =;]+(?=)/g)
    if (keys) {
        for (let i = keys.length; i--; ) {
            document.cookie = `${keys[i]}=0;expires=${new Date(
                0,
            ).toUTCString()}`
        }
    }
}

// 获取Cookie
export function getCookie(cname) {
    const name = `${cname}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1)
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
}

// 从cookie和localstorage中获取token
function getTimeToken() {
    const token = getCookie('token')
    let timeToken = ''
    if (token) {
        localStorage.setItem('token', token)
        const time = new Date().getTime() + 2 * 60 * 60 * 1000
        localStorage.setItem(`expire`, `${time}`)
        timeToken = token
    } else {
        timeToken = localStorage.getItem('token')
        const expire = localStorage.getItem(`expire`) || 0
        if (expire > 0 && expire <= new Date().getTime()) {
            localStorage.removeItem('token')
            localStorage.removeItem(`expire`)
            timeToken = ''
        }
    }
    return timeToken
}

export default {
    getTimeToken,
    setCookie,
    removeCookie,
}
