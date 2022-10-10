import { graphic } from 'echarts/core'
import { chartColors } from './chartColors'

export const defaultTheme = 'customed'
import dataSet from './data.json'
export const seriesLineData = {
  name: '',
  type: 'line',
  smooth: false,
  lineStyle: {
    color: null,
    type: 'solid',
    width: 1
  }
}
export const option = {
  legend: {
    show: true,
    top: 'top',
    left: 'center',
    itemGap: 10,
    textStyle: {
      color: '#fff',
      fontSize: 12
    }
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  grid: {
    left: "10%",
    right: "5%",
    bottom: "10%",
    top: "20%"
  },
  xAxis: {
    show: true,
    type: 'category',
    axisLabel: {
      color: '#484343',
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
      color: '#484343',
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
  color: chartColors[defaultTheme].slice(0, 3),
  dataset: { ...dataSet },
  series: [
    {
      type: 'line',
      name: 'sale',
      smooth: false,
      lineStyle: {
        color: null,
        width: 3,
        type: 'solid',
      },
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(254,182,57,0.4)' },
          { offset: 1, color: 'rgba(254,182,57,0)' },
        ])
      },
    },
    {
      type: 'line',
      smooth: false,
      name: 'amount',
      lineStyle: {
        color: null,
        width: 3,
        type: 'solid',
      },
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(1,142,255, 0.4)' },
          { offset: 1, color: 'rgba(1,142,255, 0)' },
        ])
      },
    }
  ]
}

