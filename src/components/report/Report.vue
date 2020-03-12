<template>
  <div>
    <h3>Chart Report</h3>
    <!-- breadcrumb nav -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Report</el-breadcrumb-item>
      <el-breadcrumb-item>Chart</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="c1" ref="chart1"></div>
      <div id="c2" style="width:500px;height:300px;"></div>
    </el-card>
  </div>
</template>

<script>
import echart from 'echarts'
import _ from 'lodash'
// import elResize from '../../assets/js/esresize'
import { Chart } from '@antv/g2'
export default {
  name: 'Report',
  data() {
    return {
      // need to be merged
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      chart1: {
        container: 'chart1',
        chartData: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 }
        ]
      }
    }
  },
  async mounted () {
    // g2 example
    // this.barChart()
    const eChart = echart.init(document.getElementById('c2'))
    // const resizeDiv = document.getElementById('c2')
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) return this.$message.error('Failed to load chart data.')
    const resultD = _.merge(res.data, this.options)
    eChart.setOption(resultD)
    // const listener = function () {
    //   eChart.resize()
    // }
    // elResize(resizeDiv, listener)
  },
  methods: {
    // g2 example
    barChart () {
      // Step 1: 创建 Chart 对象
      const chart = new Chart({
        container: 'c1', // 指定图表容器 ID
        forceFit: true,
        width: this.$refs.chart1.offsetWidth,
        height: 300
      })
      // Step 2: 载入数据源
      chart.data(this.chart1.chartData)
      // Step 3：创建图形语法，绘制柱状图
      chart.interval().position('genre*sold')
      // Step 4: 渲染图表
      chart.render()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
