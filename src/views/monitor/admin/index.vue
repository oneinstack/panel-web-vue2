<template>
  <div class="monitor-editor-container">
    <div class="liang-header">
      <span>开启监控</span>
      <el-switch v-model="monitorSet.status" size="small" style="margin-right: 15px;" :active-value="1" :inactive-value="0" />
      <span>保存天数</span>
      <el-input v-model="monitorSet.id" type="hidden" style="width:0px;" />
      <el-input v-model="monitorSet.save_days" size="small" style="width:200px;margin-right: 10px;" placeholder="请输入内容" />
      <el-button type="primary" size="small" @click="handleSaveMonitor">保存</el-button>
      <el-button size="small" type="danger" @click="handleDelMonitor">清空记录</el-button>
    </div>
    <div class="liang-filters-box">
      <el-radio-group v-model="chartsRadio" size="medium" @change="handleRadio">
        <el-radio-button label="1">今天</el-radio-button>
        <el-radio-button label="2">昨天</el-radio-button>
        <el-radio-button label="7">7天</el-radio-button>
      </el-radio-group>
      <el-date-picker
        v-model="chartsDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
        @change="changeChartsDate"
      />
    </div>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <chart-cpuusage :chart-data="CPUUsage" />
    </el-row>
  </div>
</template>

<script>

import ChartCpuusage from './components/ChartCPUUsage'
import liangTools from '@/utils/liangTools'
import { mapState } from 'vuex'
export default {
  name: 'MonitorAdmin',
  components: {
    ChartCpuusage
  },
  data() {
    return {
      chartsRadio: '1',
      chartsDate: [],
      monitorSet: {
        id: null,
        status: '0',
        save_days: null
      },
      CPUUsage: [],
      CPULoad: [],
      DiskIO: [],
      Memory: []
    }
  },
  computed: {
    ...mapState({
      monitorSetObj: state => state.monitor.monitorSetObj, // 企业概述
      monitorDataInfo: state => state.monitor.monitorDataInfo // 监控数据信息
    })
  },
  watch: {
    monitorSetObj() {
      this.monitorSet = JSON.parse(JSON.stringify(this.monitorSetObj))
    },
    monitorDataInfo() {
      this.CPUUsage = this.monitorDataInfo.CPUUsage
      console.log(this.CPUUsage)
    }
  },

  created() {
    this.$store.dispatch('monitor/getMonitorSetting')
    this.handleRadio()
  },
  methods: {
    handleRadio() {
      const paramsRadio = {}
      const oneTimestamp = 24 * 60 * 60 * 1000
      if (this.chartsRadio === '1') {
        paramsRadio.startTime = liangTools.millToSecond(new Date(new Date().toLocaleDateString()).getTime())
        paramsRadio.endTime = liangTools.millToSecond(new Date(new Date().toLocaleDateString()).getTime() + oneTimestamp - 1)
      } else if (this.chartsRadio === '2') {
        paramsRadio.startTime = liangTools.millToSecond(new Date(new Date().toLocaleDateString()).getTime() - oneTimestamp)
        paramsRadio.endTime = liangTools.millToSecond(new Date(new Date().toLocaleDateString()).getTime() - 1)
      } else if (this.chartsRadio === '7') {
        paramsRadio.startTime = liangTools.millToSecond(new Date(new Date().toLocaleDateString()).getTime() - oneTimestamp * 7)
        paramsRadio.endTime = liangTools.millToSecond(new Date(new Date().toLocaleDateString()).getTime() - 1)
      }
      this.$store.dispatch('monitor/getMonitorInfo', paramsRadio)
    },
    changeChartsDate() {
      console.log(this.chartsDate)
      const params = {
        startTime: liangTools.millToSecond(this.chartsDate[0]),
        endTime: liangTools.millToSecond(this.chartsDate[1])
      }
      this.$store.dispatch('monitor/getMonitorInfo', params)
    },
    handleSaveMonitor() {
      console.log(this.monitorSet)
      const params = {
        id: parseInt(this.monitorSet.id),
        status: parseInt(this.monitorSet.status),
        save_days: parseInt(this.monitorSet.save_days)
      }
      this.$store.dispatch('monitor/getModifyMonitorSetting', params)
    },
    handleDelMonitor() {
      this.$store.dispatch('monitor/getMonitorDelete')
    }

  }
}
</script>

<style lang="scss" scoped>
  .monitor-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .liang-header{
      position: relative;
      width:100%;
      height: 60px;
      span{
        display: inline-block;
        font-size: 14px;
      }
    }
    .liang-filters-box{
      height: 50px;
    }
    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
