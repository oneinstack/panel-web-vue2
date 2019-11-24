<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="CPUUsage" />
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="CPULoad" />
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="DiskIO" />
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="Memory" />
    </el-row>

  </div>
</template>

<script>

import PanelGroup from './components/PanelGroupMonitor'
import LineChart from './components/LineChartCPUUsage'

import { parseTime } from '@/utils'
import { getInfo } from '@/api/monitor'
export default {
  name: 'MonitorAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      CPUUsage: {},
      CPULoad: {},
      DiskIO: {},
      Memory: {}
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    handleSetLineChartData(type) {

    },
    async getInfo() {
      const para = {
        startTime: 1573129137,
        endTime: 1573129234
      }
      const res = await getInfo(para)
      this.prepareData(res.data)
    },
    prepareData(data) {
      const [CPUUsageData, CPULoadData, DiskIOData, MemoryData] = [
        { type: 0, title: 'CPU Usage(%)', timeline: [], data: { CPUPercent: [] }},
        { type: 1, title: 'CPU Load', timeline: [], data: { load1: [], load5: [], load15: [] }},
        { type: 2, title: 'Disk IO', timeline: [], data: { ReadCount: [], WriteCount: [], ReadBytes: [], WriteBytes: [] }},
        { type: 3, title: 'Memory', timeline: [], data: { MemPercent: [], SwapPercent: [] }}
      ]
      const { CPUUsage, CPULoad, DiskIO, Memory } = data

      for (let i = 0; i < CPUUsage.length; i++) {
        const line = CPUUsage[i]
        CPUUsageData.timeline.push(parseTime(line.Time, '{m}-{d} {h}:{i}'))
        CPUUsageData.data.CPUPercent.push((line.CPUPercent).toFixed(2))
      }
      for (let i = 0; i < CPULoad.length; i++) {
        const line = CPULoad[i]
        CPULoadData.timeline.push(parseTime(line.Time, '{m}-{d} {h}:{i}'))
        CPULoadData.data.load1.push(line.Load1)
        CPULoadData.data.load5.push(line.Load5)
        CPULoadData.data.load15.push(line.Load15)
      }

      for (let i = 0; i < DiskIO.length; i++) {
        const line = DiskIO[i]
        DiskIOData.timeline.push(parseTime(line.Time, '{m}-{d} {h}:{i}'))
        DiskIOData.data.ReadCount.push(line.ReadCount)
        DiskIOData.data.WriteCount.push(line.WriteCount)
        DiskIOData.data.ReadBytes.push(line.ReadBytes)
        DiskIOData.data.WriteBytes.push(line.WriteBytes)
      }

      for (let i = 0; i < Memory.length; i++) {
        const line = Memory[i]
        MemoryData.timeline.push(parseTime(line.Time, '{m}-{d} {h}:{i}'))
        MemoryData.data.MemPercent.push(line.MemPercent)
        MemoryData.data.SwapPercent.push(line.SwapPercent)
      }

      this.CPUUsage = CPUUsageData
      this.CPULoad = CPULoadData
      this.DiskIO = DiskIOData
      this.Memory = MemoryData
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

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

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
