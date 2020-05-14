<template>
<div class="chart">
  <div ref="chartDemo"></div>
</div>
</template>

<script>
import { Chart, Util } from '@antv/g2';
export default {
  name: 'PlatformChart',
  props: {
    errChartData: {
      type: Array,
      defalut: []
    }
  },
  watch: {
    errChartData(newData) {
      console.log('newData', newData);
      this.initChart(newData)
    }
  },
  data() {
    return {};
  },
  methods: {
    initChart(chartData) {
      // 需要搜集没错错误类型的前多少名
      // 比如从文件名角度，从错误类型，
      let data = [
        { item: '文件名1', count: 40, percent: 0.4 },
        { item: '文件名2', count: 21, percent: 0.21 },
        { item: '文件名3', count: 17, percent: 0.17 },
        { item: '文件名4', count: 13, percent: 0.13 },
        { item: '文件名5', count: 9, percent: 0.09 }
      ];

      console.log('chartData', chartData);
      // if (chartData.length) {
      //   data = chartData.map(item => {
      //     item.item = item.name[0];
      //     item.percent = Number((item.count / 70).toFixed(2))
      //     return item;
      //   })
      // }

      const chart = new Chart({
        // 用id的话，没法实例多个
        container: this.$refs.chartDemo,
        forceFit: true,
        autoFit: true,
        // 需要添加宽高值
        width: 400,
        height: 600,
        padding:[0,0,0,0]
      });

      chart.data(data);

      chart.coordinate('theta', {
        radius: 0.85
      });
      chart.legend('item',{
        title: null,
        position: 'left-center',
        // offsetX: 10,
      }); 
      chart.scale('percent', {
        formatter: val => {
          val = val * 100 + '%';
          return val;
        }
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      });
      // chart.axis(false); // 关闭坐标轴
      const interval = chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', {
          offset: -40,
          style: {
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
            fill: '#fff'
          }
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        });
      chart.interaction('element-single-selected');
      chart.render();

      // 默认选择
      interval.elements[0].setState('selected', true);
    }
  },
  mounted() {
    console.log('this.errChartData', this.errChartData);
    if (this.errChartData.length) {
      this.initChart(this.errChartData);
    }
    
  }
};
</script>

<style lang="scss" scoped>
.chart {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>