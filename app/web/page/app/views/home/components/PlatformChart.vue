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
      const data = [
        { item: '事例一', count: 40, percent: 0.4 },
        { item: '事例二', count: 21, percent: 0.21 },
        { item: '事例三', count: 17, percent: 0.17 },
        { item: '事例四', count: 13, percent: 0.13 },
        { item: '事例五', count: 9, percent: 0.09 }
      ];

      const chart = new Chart({
        // 用id的话，没法实例多个
        container: this.$refs.chartDemo,
        autoFit: true,
        // 需要添加宽高值
        width: 300,
        height: 300
      });

      chart.data(data);

      chart.coordinate('theta', {
        radius: 0.85
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
      chart.axis(false); // 关闭坐标轴
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