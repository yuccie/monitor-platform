<template>
<div class="chart">
  <div ref="chartDemo"></div>
</div>
</template>

<script>
import { Chart, Util } from '@antv/g2';
export default {
  name: 'PlatformChart',
  data() {
    return {};
  },
  methods: {
    initChart() {
      // 需要搜集没错错误类型的前多少名
      // 比如从文件名角度，从错误类型，
      const data = [
        { item: 'Queuing', count: 40, percent: 0.4 },
        { item: 'TTFB', count: 21, percent: 0.21 },
        { item: 'DOMContentLoaded', count: 17, percent: 0.17 },
        { item: 'loaded', count: 13, percent: 0.13 },
      ];

      const chart = new Chart({
        // 用id的话，没法实例多个
        container: this.$refs.chartDemo,
        // forceFit: true,
        // autoFit: true,
        // 需要添加宽高值
        width: 400,
        height: 600,
        // padding:[0,0,0,0]
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
    this.initChart();
  },
  created() {
    console.log(11);
              const e = document.createEvent('Event')
    e.initEvent('resize', true, true)
    window.dispatchEvent(e)
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