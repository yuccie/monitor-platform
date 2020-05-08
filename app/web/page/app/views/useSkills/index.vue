<template>
  <div class="skills">
    <h4 class="title">{{msg}}</h4>

    <div class="item">
      <p class="desc">chart示例：</p>
      <div id="chartDemo"></div>
    </div>

    <div class="item">
      <p class="desc">window.onerror示例：</p>
      <div class="err-list">
        <p>{{ `异常信息：${errData.errMsg}` }}</p>
        <p>{{ `异常文件路径：${errData.scriptURI}` }}</p>
        <p>{{ `异常行号：${errData.lineNo}` }}</p>
        <p>{{ `异常列号：${errData.columnNo}` }}</p>
        <p>{{ `异常堆栈信息：${errData.error}` }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';
export default {
  data() {
    return {
      msg: '这是examples页面，用来演示各种方法或者api的使用',
      errData: {}
    };
  },
  methods: {
    // 实例化一个chart图标
    initChart() {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 }
      ];

      // Step 1: 创建 Chart 对象
      const chart = new Chart({
        container: 'chartDemo', // 指定图表容器 ID
        width: 600, // 指定图表宽度
        height: 300 // 指定图表高度
      });

      // Step 2: 载入数据源
      chart.data(data);

      // Step 3：创建图形语法，绘制柱状图
      chart.interval().position('genre*sold');

      // Step 4: 渲染图表
      chart.render();
    },
    initError() {
      // window.onerror = function(errDatas){
      //   // debugger
      //   console.log('errData', errData);
      // }
      // debugger
      console.log(aaa)
      // throw new Error('故意抛出错误');
    }
  },
  mounted() {
    this.initChart();
    this.initError();
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.skills {
  .title {
    color: red;
    margin-bottom: 15px;
  }
  .item {
    display: flex;
    align-content: center;
    .desc {
      color: brown;
      font-weight: 600;
    }
    .err-list {
    }
  }
}
</style>
