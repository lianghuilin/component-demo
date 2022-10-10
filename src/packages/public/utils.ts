import { positionMap, PositionMap } from './config'
export const getDecoratePositonList = (
    list: string[],
    positionType: keyof PositionMap,
) => {
    const Def: string[] = positionMap[positionType]
    const uniqueList = [...new Set(Def.concat(list))]
    const reset: string[] = []
    uniqueList.forEach((val: string) => {
        if (Def.includes(val) && list.includes(val)) reset.push(val)
    })
    return reset
}

export const getDiff = (sourceArr: string[], compareArr: string[]) => {
    const diffArr = sourceArr.filter((val) => !compareArr.includes(val));
    return diffArr;
};