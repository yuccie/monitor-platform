<template>
  <div class="home">
    <LayoutHeader>
      <TimerSelector :timeRange.sync="timeRange"></TimerSelector>

      <el-autocomplete
        size="small"
        class="inline-input"
        v-model="state1"
        :fetch-suggestions="querySearch"
        placeholder="请输入项目"
        @select="handleSelect"
      ></el-autocomplete>
    </LayoutHeader>

    <div class="platform">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="title">
              <h4>异常监控平台</h4>
              <el-button type="text" class="button" @click="goWhichDetail('err')">查看详情</el-button>
            </div>
            <div class="btns">
              <el-select
                size="mini"
                v-model="errType"
                placeholder="请选择异常类型"
                @change="handleErrTypeChange"
              >
                <el-option
                  v-for="item in errTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <ErrChart :errChartData="errChartData" />
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover">
            <div class="title">
              <h4>性能监控平台</h4>
              <el-button type="text" class="button" @click="goWhichDetail('perf')">查看详情</el-button>
            </div>
            <div class="btns">
              <el-select
                size="mini"
                v-model="perfType"
                placeholder="请选择监控类型"
                @change="handlePerfTypeChange"
              >
                <el-option
                  v-for="item in perfTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <HeapAreaChart :chartOpt="heapAreaMapchartOpt"/>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover">
            <div class="title">
              <h4>埋点统计平台</h4>
              <el-button type="text" class="button" @click="goWhichDetail('point')">查看详情</el-button>
            </div>
            <div class="btns">
              <el-select size="mini" :disabled="true" v-model="errType" placeholder="请选择统计指标">
                <el-option
                  v-for="item in errTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <MaiDianChart />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getErr, getTypeErr, getTypePerf } from '@apis/';
import UaParser from 'ua-parser-js';
import dayjs from 'dayjs';
import LayoutHeader from '@layoutApp/header/header';
import ErrChart from './components/ErrChart';
import HeapAreaChart from './components/HeapAreaChart';
import PerfChart from './components/PerfChart';
import MaiDianChart from './components/MaiDianChart';
import PlatformChart from './components/PlatformChart';
import TimerSelector from './components/TimerSelector';
import { errTypes, perfTypes } from './data';

export default {
  components: { ErrChart, HeapAreaChart, PerfChart, MaiDianChart, PlatformChart, LayoutHeader, TimerSelector },
  data() {
    return {
      errTypes,
      perfTypes,
      errType: 2,
      perfType: 'unloadEvent',
      errChartData: [],
      restaurants: [],
      state1: '',
      state2: '',
      timeRange: 7,
      heapAreaMapchartOpt: []
    };
  },
  watch: {
    timeRange(newRange) {
      this.handleErrTypeChange();
    }
  },
  methods: {
    async handleErrTypeChange() {
      let reqData = {
        timeRange: this.timeRange,
        errType: this.errType
      };
      try {
        // let res = await getErr(reqData);
        let res = await getTypeErr(reqData);
        const { list } = res.data;
        if (res && list) {
          if (!list.length) {
            this.errChartData = [];
            return false;
          }

          this.errChartData = res.data.list.map(item => {
            if (this.errType === 2) {
              // 
              // g2 的图例是根据数据类型自动生成的，因此为了不生成连续图例，特地修改如下
              item.item = `日期：${item.item}`;
            }
            item.percent = Number((item.count / res.data.total).toFixed(2));
            return item;
          });
        }
      } catch (err) {}
    },
    goWhichDetail(type) {
      switch (type) {
        case 'err':
          this.$router.push({ name: 'ErrList' });
          break;
        case 'perf':
          this.$router.push({ name: 'PerfList' });
          break;
        case 'point':
          this.$router.push({ name: 'ErrDetail' });
          break;
        default:
          this.$message.warning('暂无详情额');
      }
    },
    createDiffErrs() {
      setTimeout(() => {
        // 运行时错误
        // Uncaught ReferenceError: aadd is not defined
        // console.log(aadd);
      }, 0);
      try {
      } catch (err) {
        console.log(err);
      }
      new Promise((resolve, reject) => {
        // 语法错误，比如中文分号、字符串不完整等
        // 语法错误在开发阶段就编译不过，会使程序崩溃，因此可以忽略。
        // console.log(aadd);
        // console.log('a);
        resolve();
      });
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
        { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        { value: '胖仙女纸杯蛋糕（上海凌空店）', address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        { value: '豪大大香鸡排超级奶爸', address: '上海市嘉定区曹安公路曹安路1685号' },
        { value: '茶芝兰（奶茶，手抓饼）', address: '上海市普陀区同普路1435号' },
        { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
        { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
        { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
        { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
        { value: 'Monica摩托主题咖啡店', address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
        { value: '浮生若茶（凌空soho店）', address: '上海长宁区金钟路968号9号楼地下一层' },
        { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
        { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
        { value: '快乐柠檬（神州智慧店）', address: '上海市长宁区天山西路567号1层R117号店铺' },
        { value: 'Merci Paul cafe', address: '上海市普陀区光复西路丹巴路28弄6号楼819' },
        { value: '猫山王（西郊百联店）', address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
        { value: '枪会山', address: '上海市普陀区棕榈路' },
        { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
        { value: '钱记', address: '上海市长宁区天山西路' },
        { value: '壹杯加', address: '上海市长宁区通协路' },
        { value: '唦哇嘀咖', address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
        { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
        { value: '爱茜茜里(近铁广场)', address: '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
        { value: '鲜果榨汁（金沙江路和美广店）', address: '普陀区金沙江路2239号金沙和美广场B1-10-6' },
        { value: '开心丽果（缤谷店）', address: '上海市长宁区威宁路天山路341号' },
        { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
        { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
        { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
        { value: '凡仔汉堡（老真北路店）', address: '上海市普陀区老真北路160号' },
        { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
        { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
        { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
        { value: '饭典*新简餐（凌空SOHO店）', address: '上海市长宁区金钟路968号9号楼地下一层9-83室' },
        { value: '焦耳·川式快餐（金钟路店）', address: '上海市金钟路633号地下一层甲部' },
        { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
        { value: '浏阳蒸菜', address: '天山西路430号' },
        { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
        { value: '樱花食堂（凌空店）', address: '上海市长宁区金钟路968号15楼15-105室' },
        { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
        { value: '福荣祥烧腊（平溪路店）', address: '上海市长宁区协和路福泉路255弄57-73号' },
        { value: '速记黄焖鸡米饭', address: '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
        { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
        { value: '(小杨生煎)西郊百联餐厅', address: '长宁区仙霞西路88号百联2楼' },
        { value: '阳阳麻辣烫', address: '天山西路389号' },
        { value: '南拳妈妈龙虾盖浇饭', address: '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    handlePerfTypeChange() {
      let reqData = {
        timeRange: this.timeRange,
        perfType: this.perfType
      };

      this.getTypePerf(reqData);
    },
    async getTypePerf(reqData) {
      try {
        let res = await getTypePerf(reqData);
        this.heapAreaMapchartOpt = res.data;
      } catch (err) {
        console.log(err);
      } finally {
      }
    }
  },
  created() {
    this.handleErrTypeChange();
    this.handlePerfTypeChange();
    this.createDiffErrs();
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>

<style lang="scss" scoped>
.home {
  /deep/ .inline-input {
    margin-right: 15px;
  }
  /deep/ .platform {
    margin: 25px;
    .el-card {
      // height: 400px;
      .el-card__body {
        padding: 10px;
      }
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
      }
      .btns {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
}
</style>