
export enum ChartFrameEnum {
  // echarts 框架
  ECHARTS = 'echarts',
  // 自定义带数据组件
  COMMON = 'common',
  // 无数据变更
  STATIC = 'static'
}

// 组件配置
export type ConfigType = {
  key: string
  chartKey: string
  conKey: string
  title: string
  category: string
  categoryName: string
  package: string
  chartFrame?: ChartFrameEnum
  image: string | (() => Promise<typeof import('*.png')>)
}


// Echarts 数据类型
interface EchartsDataType {
  dimensions: string[],
  source: any[]
}

// 滤镜/变换枚举
export enum FilterEnum {
  // 透明度
  OPACITY = 'opacity',
  // 饱和度
  SATURATE = 'saturate',
  // 对比度
  CONTRAST = 'contrast',
  // 色相
  HUE_ROTATE = 'hueRotate',
  // 亮度
  BRIGHTNESS = 'brightness',

  // 旋转
  ROTATE_Z = 'rotateZ',
  ROTATE_X = 'rotateX',
  ROTATE_Y = 'rotateY',

  // 倾斜
  SKEW_X = 'skewX',
  SKEW_Y = 'skewY',
}

// 包分类枚举
export enum PackagesCategoryEnum {
  CHARTS = 'Charts',
  TABLES = 'Tables',
  INFORMATIONS = 'Informations',
  DECORATES = 'Decorates',
  PROGRESS = 'Progress'
}

// 包分类名称
export enum PackagesCategoryName {
  CHARTS = '图表',
  TABLES = '列表',
  INFORMATIONS = '信息',
  DECORATES = '小组件'
}

// 获取组件
export enum FetchComFlagType {
  VIEW,
  CONFIG
}

// 图表包类型
export type PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ConfigType[]
  // [PackagesCategoryEnum.INFORMATIONS]: ConfigType[]
  [PackagesCategoryEnum.TABLES]: ConfigType[]
  [PackagesCategoryEnum.DECORATES]: ConfigType[]
}
