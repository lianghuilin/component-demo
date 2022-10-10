import dataJson from './data.json'

import { SeriesItem } from './config.d'

export const includes = ['legend', 'xAxis', 'yAxis']
export const seriesBarData: SeriesItem = {
  type: 'bar',
  barWidth: 10,
  stack: false,
  stackStrategy: 'negative',
  itemStyle: {
    color: '',
    borderRadius: 0
  }
}

export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      show: true,
      type: 'shadow'
    }
  },
  legend: {
    show: true,
    icon: 'rect',
    top: 'top',
    left: 'center',
    itemGap: 10,
    textStyle: {
      color: '#fff',
      fontSize: 12
    }
  },
  color: ['#0090ff', '#fab239'],
  xAxis: {
    show: true,
    type: 'category',
    axisLabel: {
      color: '#ffffff',
      fontSize: 16,
      rotate: 0
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: null,
        type: 'solid',
        width: 1
      }
    }
  },
  yAxis: {
    show: true,
    type: 'value',
    axisLabel: {
      color: '#ffffff',
      fontSize: 16,
      rotate: 0
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: null,
        type: 'solid',
        width: 1
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#ffffff',
        type: 'solid'
      }
    }
  },
  grid: {
    left: "10%",
    right: "5%",
    bottom: "20%",
    top: "20%"
  },
  dataset: { ...dataJson },
  series: [
    {
      type: 'bar',
      name: 'sale',
      barWidth: 10,
      stack: false,
      stackStrategy: 'positive',
      itemStyle: {
        color: null,
        borderRadius: 0
      }
    },
    {
      type: 'bar',
      name: 'amount',
      barWidth: 10,
      stack: false,
      stackStrategy: 'positive',
      itemStyle: {
        color: null,
        borderRadius: 0
      }
    }
  ]
}
