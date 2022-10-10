interface ItemStyle {
    color: string;
    borderRadius: number
}
export interface SeriesItem {
    type: string;
    barWidth: string | number | null
    stack: boolean,
    stackStrategy: string
    itemStyle: ItemStyle
}
