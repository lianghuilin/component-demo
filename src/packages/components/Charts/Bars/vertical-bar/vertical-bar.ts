import image from '@/assets/images/chart/charts/bar_x.png'
import { PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VerticalBarConfig = {
  key: 'VerticalBar',
  chartKey: 'VVerticalBar',
  conKey: 'VCVerticalBar',
  title: '柱状图',
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image
}

