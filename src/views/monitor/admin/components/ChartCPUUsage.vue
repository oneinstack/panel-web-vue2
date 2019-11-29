<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import liangTools from '@/utils/liangTools'

export default {
  name: 'ChartCPUUsage',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(CPUUsage) {
      const CPUData = CPUUsage.map(item => {
        const params = {
          name: liangTools.unix2human(item.Time),
          value: [item.Time, item.CPUPercent]
        }
        return params
      })
      this.chart.setOption({
        title: {
          text: 'CPUusage',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            params = params[0]
            return params.name + ' <br /> ' + 'CPU' + ' : ' + params.value[1] + '%'
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          interval: 3600, // 固定x轴时间间隔
          axisLabel: {
            formatter: function(value, index) {
              return liangTools.unix2hm(value)
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          name: '数据',
          type: 'line',
          itemStyle: {
            color: 'rgb(75, 135, 215)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(163, 193, 234)'
            }, {
              offset: 1,
              color: 'rgb(163, 193, 234)'
            }])
          },
          showSymbol: false,
          hoverAnimation: false,
          // data: CPUUsage
          data: CPUData
        }]
      })
    }
  }
}
</script>
