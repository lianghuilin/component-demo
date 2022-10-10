const DEF_POINT = '.'
const DEF_SYMBOL = ','
const DEF_RANGE = 3
const DEF_NULL = '--'
const numberUnitMapList = [
    {
        key: 5,
        value: '万,10000',
    },
    {
        key: 9,
        value: '亿,100000000',
    },
]
type Num = number
interface Rest {
    num: number
    unit?: string
}
// -1234556.7898或 1378878, 2345 转成 -123.46万 或 137.89万, 2,345
//  num 为 null 或 undefined 转成 DEF_NULL
export function formatterNumber(num: Num) {
    const isNumber = judgeIsNumber(num)
    if (!isNumber) return DEF_NULL
    let resetNum = transformNum(num)
    if (!resetNum) return 0
    const lastNum = formatterAbbrNum(resetNum)
    return lastNum
}
function transformNum(num: Num): number {
    const reset = Number(num)
    return +reset.toFixed(2)
}
// 判断是否数字(正数，负数，零，小数)
function judgeIsNumber(num: Num) {
    const reg = /^-?[1-9]*(\.\d*)?$|^-?0(\.\d*)?$/
    if (reg.test(`${num}`)) return true
    return false
}

// 是否有小数点
function hasDecPoint(num: number) {
    return `${num}`.indexOf(DEF_POINT)
}
// 小数点后面数据，默认取两位
function getPointAfterNum(num: number, fixedNum: number = 2): number {
    const pontIndex = hasDecPoint(num)
    const startPointIndex = pontIndex + 1
    const endPointIndex = startPointIndex + fixedNum
    return pontIndex >= 0 ? +`${num}`.slice(startPointIndex, endPointIndex) : 0
}
// 是否是负数
function isNegativeNumber(num: number) {
    if (num < 0) return true
    return false
}
// 去掉小数点的正整数
function formatterDecPoint(num: number): number {
    const pontIndex = hasDecPoint(num)
    const notDecPointNum = pontIndex >= 0 ? +`${num}`.slice(0, pontIndex) : num
    return Math.abs(notDecPointNum)
}
// 最后结果
export function normalizeFormatterNum({ num, unit }: Rest) {
    const symboNum = serializeFormatterNum(num)
    const isMinusNum = isNegativeNumber(num)
    const pointAfterNum = getPointAfterNum(num)
    const combinateNum = combinateFormattrNum(symboNum, pointAfterNum)
    const resetNum = unit ? `${combinateNum}${unit}` : combinateNum
    return isMinusNum ? `-${resetNum}` : `${resetNum}`
}
// 切割num
function splitNum(num: number): Array<string> {
    return `${formatterDecPoint(num)}`.split('')
}
// 链接数据
function reverseAndJoinNum(list: Array<number | string>): string {
    return list.reverse().join('')
}
// 组合数据
function combinateFormattrNum(symboNum: string, pointAfterNum: number) {
    if (pointAfterNum) return `${symboNum}.${pointAfterNum}`
    return symboNum
}
// 数字是万或者亿的时候简写
function formatterAbbrNum(num: number) {
    const notDecPointNum = formatterDecPoint(num)
    const numLen = `${notDecPointNum}`.length
    const numAbbrItem = numberUnitMapList.find(item => numLen >= item.key)
    let resetNum = notDecPointNum
    const isMinusNum = isNegativeNumber(num)
    let unmUnit = ''
    if (numAbbrItem) {
        const { value } = numAbbrItem
        const [unit, unitNum] = value.split(',')
        let abbrNum = notDecPointNum / +unitNum
        resetNum = isMinusNum ? -abbrNum : abbrNum
        unmUnit = unit
    }
    return normalizeFormatterNum({ num: resetNum, unit: unmUnit })
}
// 数据添加逗号
function serializeFormatterNum(num: number) {
    const numList: Array<string> = splitNum(num)
    const tempList = []
    let count: number = 1
    for (let i = numList.length - 1; i >= 0; i--) {
        if (count === DEF_RANGE && numList.length > DEF_RANGE) {
            numList[i - 1]
                ? tempList.push(numList[i], DEF_SYMBOL)
                : tempList.push(numList[i])
            count = 1
        } else {
            tempList.push(numList[i])
            count++
        }
    }
    return reverseAndJoinNum(tempList)
}

export function animateNumFormatter(num: number){
    const symboNum = serializeFormatterNum(num)
    const isMinusNum = isNegativeNumber(num)
    return isMinusNum ? `-${symboNum}` : `${symboNum}` 
}