
// vh/vw转换
const designWidth = 1920 // 设计稿宽度
const designHeight = 1080 // 设计稿高度
// const designRatio = designWidth / designHeight // 设计稿宽比

// 实际宽度
// const realWidth = document.documentElement.clientWidth
// 实际高度
// const realHeight = document.documentElement.clientHeight
// 实际的宽高比
// const realRatio = realWidth / realHeight

export const dpr = window.devicePixelRatio

export const bigScreenDpr = dpr > 2

const transform = (type: string, px: number) => {
    const target = type === 'vw' ? designWidth : designHeight
    return `${(px / target) * 100}${type}`
}

export const vh = (px: number) => {
    return transform('vh', px)
}

export const vw = (px: number) => {
    return transform('vw', px)
}