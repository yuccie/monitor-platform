<template>
  <div class="skills">
    <h4 class="title">{{msg}}</h4>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>egg-mongoose 使用示例</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="item">
        <el-button type="primary" round @click="getErr">获取异常数据</el-button>
        <el-button type="success" round @click="delErr">删除异常数据</el-button>
        <el-button type="success" round @click="updateErr">更新异常数据</el-button>
        <el-button type="info" round @click="getPerf">测试新数据库集合</el-button>
        <el-button type="warning" round>待定</el-button>
        <el-button type="danger" round>待定</el-button>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>mysql 使用示例</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="item">
        <el-button type="primary" round @click="getSqlErr">获取异常数据</el-button>
        <el-button type="success" round @click="delSqlErr">删除异常数据</el-button>
        <el-button type="success" round @click="updateSqlErr">更新异常数据</el-button>
        <el-button type="info" round>待定</el-button>
        <el-button type="warning" round>待定</el-button>
        <el-button type="danger" round>待定</el-button>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>redis 使用示例</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="item">
        <el-button type="primary" round @click="getRedisErr">获取异常数据</el-button>
        <el-button type="success" round @click="delRedisErr">删除异常数据</el-button>
        <el-button type="success" round @click="setRedisErr">更新异常数据</el-button>
        <el-button type="info" round>待定</el-button>
        <el-button type="warning" round>待定</el-button>
        <el-button type="danger" round>待定</el-button>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>g2 chart示例：</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div id="chartDemo"></div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>window.onerror示例</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="err-list">
        <p>{{ `异常信息：${errData.message}` }}</p>
        <p>{{ `异常文件路径：${errData.url}` }}</p>
        <p>{{ `异常行号：${errData.lineNumber}` }}</p>
        <p>{{ `异常列号：${errData.columnNumber}` }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';
import {
  getErr,
  delErr,
  updateErr,
  getPerf,
  getSqlErr,
  delSqlErr,
  updateSqlErr,
  getRedisErr,
  delRedisErr,
  setRedisErr
} from 'framework/vue/apis';
const fnMap = {
  getErr,
  delErr,
  updateErr,
  getPerf,
  getSqlErr,
  delSqlErr,
  updateSqlErr,
  getRedisErr,
  delRedisErr,
  setRedisErr
};

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
      console.log(aaa);
      // throw new Error('故意抛出错误');
    },
    async getErr() {
      try {
        let res = await getErr();
        if (res && res.code === 0) {
          this.errData = res.data[0];
        }
        console.log('res', res);
      } catch (err) {
        console.log(err);
      }
    }
    // async delErr() {
    //   try {
    //     let res = await delErr();
    //     console.log('res', res);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async updateErr() {
    //   try {
    //     let res = await updateErr();
    //     console.log('res', res);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async getPerf() {
    //   try {
    //     let res = await getPerf();
    //     console.log('res', res);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
  mounted() {
    this.initChart();
    this.initError();
  },
  created() {
    this.getErr();
    // 初始化methods
    [
      'delErr',
      'updateErr',
      'getPerf',
      'getSqlErr',
      'delSqlErr',
      'updateSqlErr',
      'getRedisErr',
      'delRedisErr',
      'setRedisErr'
    ].forEach(key => {
      this[key] = async () => {
        try {
          let res = await fnMap[key]();
          console.log('res', res);
        } catch (err) {
          console.log(err);
        }
      };
    });
  }
};
</script>

<style lang="scss" scoped>
.skills {
  padding: 50px;
  .title {
    color: red;
    margin-bottom: 15px;
  }
  .item {
    display: flex;
    align-content: center;
    margin-bottom: 50px;
    .desc {
      color: brown;
      font-weight: 600;
    }
  }
  .box-card {
    margin: 50px auto;
  }
}
</style>
