## props 为 chartConfig
### chartConfig 为Object，为必须字段
#### chartConfig 为当前文件夹下面的config.ts

## 数据格式datset
### dimensions 为 Array<string>，Array的第一个值为图表的xAxis
##### dimensions = ['x', 'data1', 'data2']
### source 为 Array<object>
#### object 的key值需要跟dimensions对应上
#### source = [{ x: '1980', data1: 50, data2: 80 }]

## xAxis 的type为 category
