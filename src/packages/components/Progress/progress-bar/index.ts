import image from '@/assets/images/chart/tables/tables_list.png'
import { PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

export const TableListConfig = {
    key: 'ProcessTable',
    chartKey: 'VProcessTable',
    conKey: 'VCProcessTable',
    title: '滚动排名列表',
    category: ChatCategoryEnum.PROGRESS,
    categoryName: ChatCategoryEnumName.PROGRESS,
    package: PackagesCategoryEnum.TABLES,
    image
}
