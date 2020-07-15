<template>
  <div id="chart" class="chart">
    <div class="chart-ins" ref="chartDemo"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
let staticChartOpt = {
  // title: {
  //   text: '堆叠区域图'
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    },
    formatter(data) {
      let res = '<div style="padding: 5px;">';
      
      res += `${data[0].axisValueLabel} <br/>`;

      for (let i in data) {
        let tempVal = data[i].value;
        res += `
          <p style="text-align:left;">
            <span style="
              border-radius:50%;
              margin-right:2px;width: 10px;height:10px;
              display:inline-block; 
              background:${data[i].color}"></span>
            <span>${data[i].seriesName}：${tempVal}</span>
          </p>`;
      }

      res += "</div>";
      return res;
    }
  },
  legend: {
    data: [
      '页面卸载',
      '重定向',
      '缓存查询',
      'DNS查询',
      'TCP握手',
      'request建立',
      'response响应',
      'dom加载',
      '页面资源加载'
    ]
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    top: '20%',
    left: '1%',
    right: '3%',
    bottom: '1%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '页面卸载',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '重定向',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '缓存查询',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'DNS查询',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'TCP握手',
      type: 'line',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      areaStyle: {},
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    },
    {
      name: 'request建立',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'response响应',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'dom加载',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '页面资源加载',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320]
    }
  ]
};
export default {
  name: 'HeapAreaChart',
  props: {
    chartOpt: {
      type: Array,
      defalut: () => []
    }
  },
  watch: {
    chartOpt: {
      handler(newData) {
        this.refreshOpts(newData);
      },
      deep: true
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  methods: {
    initChart() {
      let chart = this.$refs.chartDemo;
      this.chartInstance = echarts.init(chart);
      console.log(1)
      this.refreshOpts(this.chartOpt);
    },
    refreshOpts(opts) {
      // 格式化chartOpts
      let temp = Array.from({length: 9}, () => [])
      for (let item of opts) {
        temp[0].push(item.unloadEventEnd)
        temp[1].push(item.redirectEnd)
        temp[2].push(item.domainLookupStart)
        temp[3].push(item.domainLookupEnd)
        temp[4].push(item.connectEnd)
        temp[5].push(item.responseStart)
        temp[6].push(item.responseEnd)
        temp[7].push(item.domContentLoadedEventEnd)
        temp[8].push(item.loadEventEnd)
      }
      for (let i = 0; i < staticChartOpt.series.length; i++) { 
        staticChartOpt.series[i].data = temp[i];
      }
      console.log('staticChartOpt', staticChartOpt);
      this.chartInstance.setOption(staticChartOpt);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener('resize', this.chartInstance.resize, false);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartInstance.resize, false);
  }
};
</script>

<style lang="scss" scoped>
.chart {
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100%;
  .chart-ins {
    width: 500px;
    height: 100%;
    height: 500px;
  }
}
</style>