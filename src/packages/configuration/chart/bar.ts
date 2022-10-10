export const barConf = {
  barStyle: {
    stackList: [
      {
        label: '是',
        value: true
      },
      {
        label: '否',
        value: false
      }
    ],
    xAxisPositions: [
      {
        label: '水平',
        value: 0,
      },
      {
        label: '垂直',
        value: 90,
      },
      {
        label: '左倾斜',
        value: 45,
      },
      {
        label: '右倾斜',
        value: -45,
      },
    ],
    commonLineTypes: [
      {
        label: '实线',
        value: 'solid'
      },
      {
        label: '虚线',
        value: 'dashed'
      },
      {
        label: '点线',
        value: 'dotted'
      },
    ],
    stackStrategyList: [
      {
        value: 'samesign',
        label: '相同的正负符号堆叠'
      },
      {
        value: 'all',
        label: '堆叠所有'
      },
      {
        value: 'positive',
        label: '只堆积正值'
      },
      {
        value: 'negative',
        label: '只堆叠负值'
      },
    ],
    legendTypesList: [
      {
        label: '圆',
        value: 'circle'
      },
      {
        label: '矩形',
        value: 'rect'
      },
      {
        label: '圆角矩形',
        value: 'roundRect'
      },
      {
        label: '菱形',
        value: 'diamond'
      },
    ],
  }
}
