<template>
  <div class="chart">
    <div ref="chartDemo"></div>
  </div>
</template>

<script>
// 展示不同纬度的数据，比如最近7天，每天不同类型下的错误数量统计
// 然后下面的列表，就需要展示不同类型下的数据，
import { trendChartData } from '../data.js';
import { Chart } from '@antv/g2';
export default {
  props: {
    errChartData: {
      type: Array,
      defalut: []
    }
  },
  watch: {
    // errChartData: {
    //   handler(newData) {
    //     this.$nextTick(() => {
    //       this.changeData(newData);
    //     });
    //   },
    //   deep: true
    // }
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

      chart.data(data);
      // 其实就是值的刻度，展示在竖轴上
      chart.scale({
        nlp: {
          min: 0,
          max: 100
        },
        blockchain: {
          min: 0,
          max: 100
        }
      });

      // 竖轴的刻度线是否显示，多个竖轴只需显示最大的那个即可
      chart.axis('nlp', false);

      // 图例样式
      chart.legend({
        custom: true,
        items: [
          {
            name: 'blockchain',
            value: 'blockchain',
            marker: { symbol: 'circle', style: { stroke: '#1890ff', lineWidth: 2 } }
          },
          { name: 'nlp', value: 'nlp', marker: { symbol: 'circle', style: { stroke: '#2fc25b', lineWidth: 2 } } }
        ]
      });

      // 分别横轴和竖轴的值，需要指定颜色
      chart
        .line()
        .position('date*blockchain')
        .color('#1890ff');
      chart
        .line()
        .position('date*nlp')
        .color('#2fc25b');

      // 图表上着重的标明的点
      chart.annotation().dataMarker({
        top: true,
        position: ['2016-02-28', 9],
        text: {
          content: 'Blockchain 首超 NLP',
          style: {
            textAlign: 'left'
          }
        },
        line: {
          length: 30
        }
      });
      chart.annotation().dataMarker({
        top: true,
        position: ['2017-12-17', 100],
        line: {
          length: 30
        },
        text: {
          content: '2017-12-17, 受比特币影响，\n blockchain搜索热度达到顶峰\n峰值：100',
          style: {
            textAlign: 'right'
          }
        }
      });
      chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互
      chart.render();
    },
    changeData(newData) {
      this.chart && this.chart.changeData(newData);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(trendChartData);
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