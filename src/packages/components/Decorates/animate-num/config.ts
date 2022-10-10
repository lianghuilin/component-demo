interface NumConfig {
  dataset: number;
  from: number;
  duration: number;
  numberSize: number;
  numberColor: string;
  isNeedFormatter: boolean
}
export const option: NumConfig = {
  // 数据说明
  dataset: 0,
  from: 0,
  duration: 2000,
  numberSize: 30,
  numberColor: '#fff',
  isNeedFormatter: true
}
