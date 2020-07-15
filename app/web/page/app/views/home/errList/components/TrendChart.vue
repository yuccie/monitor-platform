<template>
  <div class="chart">
    <div ref="chartDemo"></div>
  </div>
</template>

<script>
// 展示不同纬度的数据，比如最近7天，每天不同类型下的错误数量统计
// 因为一个错误里，肯定会包含name，message，create_at等，所以不同类型的的错误没法区分
// 然后下面的列表，就需要展示不同类型下的数据，
import { trendChartData } from '../data.js';
import { Chart } from '@antv/g2';
export default {
  props: {
    chartData: {
      type: Array,
      defalut: []
    }
  },
  watch: {
    chartData: {
      handler(newData) {
        this.$nextTick(() => {
          this.changeData(newData);
        });
      },
      deep: true
    }
  },
  data() {
    return {};
  },
  methods: {
    initChart(data) {
      const chart = new Chart({
        container: this.$refs.chartDemo,
        autoFit: true,
        height: 300,
        padding: [30, 20, 70, 30]
      });
      this.chart = chart;

      chart.data(data);
      // 其实就是值的刻度，展示在竖轴上
      chart.scale({
        date: {
          // min: 0,
          // max: 100
          nice: true
          // range: [0.15, 0.15],
        },
        count: {
          min: 0,
          // max: 100,
          nice: true
        }
      });
      chart.legend('item', {
        title: null,
        position: 'bottom-center'
        // marker: 'square',
        // itemFormatter(val) {
        //   console.log('val', val)
        //   return val;
        // }
        // offsetX: 10,
      });
      chart.coordinate('rect').scale(0.95, 1);

      // 竖轴的刻度线是否显示，多个竖轴只需显示最大的那个即可
      // chart.axis('nlp', false);

      // 图例样式
      chart.legend({
        custom: true,
        items: [
          {
            name: '异常数量',
            value: 'count',
            marker: { symbol: 'circle', style: { stroke: '#1890ff', lineWidth: 2 } }
          }
          // { name: 'nlp', value: 'nlp', marker: { symbol: 'circle', style: { stroke: '#2fc25b', lineWidth: 2 } } }
        ]
      });

      // 分别横轴和竖轴的值，需要指定颜色
      chart
        .line()
        .position('date*count')
        .tooltip('date*count', (date, count) => {
          return {
            date: `${date}：`,
            count: `异常数量${count}`
          };
        })
        .color('#1890ff')
        .shape('smooth')
        .label('count');

      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true,
        showTitle: false,
        itemTpl: '<li>{date}{count}</li>'
      });

      chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互
      chart.render();
    },
    changeData(newData) {
      if (this.chart) {
        this.chart.data(newData);
        this.chart.render();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(this.chartData);
    });
  }
};
</script>

<style lang="scss" scoped>
.chart {
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>