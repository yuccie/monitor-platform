<template>
<div id="chart" class="chart">
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
    errChartData: {
      handler(newData) {
        this.$nextTick(() => {
          this.changeData(newData)
        })
      },
      deep: true,
    }
  },
  data() {
    return {};
  },
  methods: {
    initChart(data) {
      
      // 需要搜集没错错误类型的前多少名
      // 比如从文件名角度，从错误类型，
      const chart = new Chart({
        // 用id的话，没法实例多个
        container: this.$refs.chartDemo,
        // forceFit: true,
        // autoFit: true,
        // 需要添加宽高值
        width: Number(window.getComputedStyle(document.querySelector('#chart')).width.replace('px', '')) * 0.9,
        height: 600,
        padding:[0,0,0,0]
      });
      this.chart = chart;

      chart.data(data);

      chart.coordinate('theta', {
        radius: 0.85
      });
      chart.legend('item',{
        title: null,
        position: 'left-center',
        // marker: 'square',
        // itemFormatter(val) {
        //   console.log('val', val)
        //   return val;
        // }
        offsetX: -10,
      }); 
      chart.scale('percent', {
        formatter: val => {
          val = (val * 100).toFixed(0) + '%';
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
          percent = (percent * 100).toFixed(0) + '%';
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
      this.chart.interval = interval;

      // 默认选择，初次渲染elements可能为空
      if (interval.elements.length) {
        interval.elements[0].setState('selected', true);
      }
    },
    changeData(newData) {
      // this.chart && this.chart.changeData(newData);
      if (this.chart) {
        this.chart.data(newData);
        this.chart.render()
        // 更新数据时，默认选中一个
        this.chart.interval.elements[0].setState('selected', true);
      }
    }
  },
  mounted() {
    console.log(document.querySelector('#chart'));
    console.log(window.getComputedStyle(document.querySelector('#chart')).width, 'ddd')
    // 如果刚开始数据为空时，会导致chart实例并没有创建，然后数据更新时会不显示图表
    // if (this.errChartData.length) {
      this.$nextTick(() => {
        this.initChart(this.errChartData);
      })
    // }
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