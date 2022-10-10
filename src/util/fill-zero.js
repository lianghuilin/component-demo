export function fillZero(number) {
    let numStr = String(number)
    if (numStr.length === 1) {
        return `0${number}`
    }
    return number
}
