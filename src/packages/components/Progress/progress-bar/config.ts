export const option = {
  // 数据
  dataset: [],
  // 数值单位
  unit: '笔',
  // 数值单位字体大小
  unitSize: 12,
  // 数值单位字体颜色
  unitColor: '#4E586B',
  // 数据的字体颜色
  textColor: '#CDD2F8FF',
  //序号字体大小
  indexFontSize: 12,
  //左侧数据字体大小
  leftFontSize: 12,
  //右侧数据字体大小
  rightFontSize: 12,
  // 右侧数据的背景颜色
  rightBackground: '#2E394E',
  // 进度条的高度
  processH: 8,
  // 进度条的圆角大小
  borderRadius: 4,
  // 进度条颜色
  processColor: '#006BB6',
  // 无限轮询的颜色
  infiniteColor: 'repeating-linear-gradient(180deg, rgb(31,147,228) 20px, rgb(0,107,182) 30px)',
  // 格式化
  valueFormatter: (item: { value: any }) => item.value
}