/**
 * 数值格式化的工具
 * @param { 原始数值 } number
 * @param { 是否进行万、亿位数的缩写 } doAbbr
 * @param { 是否取整 } isInteger
 * @param { 是否四舍五入 } isRounding
 * @param { 是否进行千分位逗号的格式化 } hasComma
 * @param { 缩写配置表 } abbrConfigList
 * @returns { 纯数值结果 } result
 * @returns { 单位结果 } unit
 * @returns { 带千位符格式化的数值结果 } commaResult
 */
export function formatterNumber(
    number,
    doAbbr = false,
    isInteger = true,
    isRounding = true,
    hasComma = true,
    abbrConfigList = [],
) {
    let result = {
        unit: '',
        result: '--',
        commaResult: '--',
    }
    // 简单校验:非number类型的数据,进行浮点数转换,转换失败则返回NaN
    if (typeof number !== 'number') {
        return result
    }

    number = parseFloat(number)
    if (number === 'NaN') {
        return result
    }

    const numberStr = number.toString() // 数值转字符串
    const pointIndex = numberStr.indexOf('.') // 小数点下标
    const pointLastIndex = numberStr.lastIndexOf('.') // 倒数小数点下标
    const hasPoint = pointIndex !== -1 // 是否有小数点
    // 缩写与位数下标的集合
    const abbrList =
        abbrConfigList && abbrConfigList.length > 0
            ? abbrConfigList
            : [
                  {
                      index: 9,
                      unit: '亿',
                  },
                  {
                      index: 5,
                      unit: '万',
                  },
              ]

    let numberArr = numberStr.split('')
    const numberLength = numberArr.length

    /**
     * 内部函数：千位符数值格式化
     * @param { 数值数组 } numArr
     * @returns
     */
    function commaFormat(numArr) {
        let result = []
        let loopArr = []

        const realNumPointIndex = numArr.lastIndexOf('.')
        const hasPoint = realNumPointIndex !== -1
        if (hasPoint) {
            // 有小数点，则按情况进行取整操作
            let intergeNum = 0

            if (isInteger) {
                if (isRounding) {
                    // 四舍五入
                    intergeNum =
                        Math.round(
                            (parseFloat(numArr.join('')) + Number.EPSILON) *
                                100,
                        ) / 100
                } else {
                    // 直接截断
                    intergeNum = parseInt(numArr.join(''), 10)
                }
                numArr = intergeNum.toString().split('')
            }
        }

        // 每3位加一个千位符
        const endIndex = hasPoint ? realNumPointIndex : numberArr.length
        loopArr = numArr.slice(0, endIndex).reverse()
        loopArr.forEach((item, index) => {
            if (index !== 0 && index % 3 === 0) {
                result.push(',')
            }
            result.push(item)
        })

        result.reverse()
        if (hasPoint) {
            const pointArr = numArr.slice(endIndex, numArr.length)
            result = result.concat(pointArr)
        }

        return result
    }

    /**
     * 获取当前缩写配置
     * @param { 缩写配置表 } abbrList
     * @param { 当前数值长度 } length
     * @return
     */
    function getAbbr(abbrList, length) {
        for (let index = 0; index < abbrList.length; index++) {
            const abbr = abbrList[index]
            if (length >= abbr.index) {
                return abbr
            }
        }
        return abbrList[abbrList.length - 1]
    }

    // 是否缩写
    if (doAbbr) {
        let realLength = 0
        if (hasPoint) {
            realLength = pointLastIndex
        } else {
            realLength = numberLength
        }

        const realAbbr = getAbbr(abbrList, realLength)

        // 如果命中区间则进行缩写转换
        if (realAbbr) {
            const abbrNum = number / 10 ** (realAbbr.index - 1)
            number = Math.round((abbrNum + Number.EPSILON) * 100) / 100
            numberArr = number.toString().split('')
        }

        result = {
            unit: realAbbr ? realAbbr.unit : '',
            result: `${numberArr.join('')}`,
            commaResult: hasComma
                ? commaFormat(numberArr, hasPoint).join('')
                : '',
        }
    } else {
        // 由于后端提供的数值，小数点后最多两位，所以不进行缩写的数值，不用取整处理
        result = {
            unit: '',
            result: `${numberArr.join('')}`,
            commaResult: hasComma
                ? commaFormat(numberArr, hasPoint).join('')
                : '',
        }
    }

    return result
}

// 格式化金额：不缩写、不取整、四舍五入、千位符格式化
export function fmtMoney(number) {
    return formatterNumber(number, false, false, true, true)
}

// 格式化金额：缩写、不取整、四舍五入、千位符格式化
export function fmtCommaMoney(number) {
    return formatterNumber(number, true, false, true, true)
}

// 格式化数值：不缩写、不取整、截断、千位符格式化
export function fmtNumber(number) {
    return formatterNumber(number, false, false, false, true)
}

// 格式化数值：缩写、不取整、截断、千位符格式化
export function fmtCommaNumber(number) {
    return formatterNumber(number, true, false, false, true)
}
