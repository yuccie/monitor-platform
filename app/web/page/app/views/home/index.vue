<template>
  <div class="home">
    <div class="platform">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="title">
              <h4>异常监控平台</h4>
              <el-button type="text" class="button">查看更多</el-button>
            </div>
            <div class="btns">
              <el-select size="mini" v-model="errType" placeholder="请选择异常类型" @change="handleErrTypeChange">
                <el-option
                  v-for="item in errTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <ErrChart :errChartData="errChartData"/>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover">
            <div class="title">
              <h4>性能监控平台</h4>
              <el-button type="text" class="button">查看更多</el-button>
            </div>
            <div class="btns">
              <el-select size="mini" :disabled="true" v-model="perfType" placeholder="请选择监控类型">
                <el-option
                  v-for="item in perfTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <PerfChart />
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover">
            <div class="title">
              <h4>埋点统计平台</h4>
              <el-button type="text" class="button">查看更多</el-button>
            </div>
            <div class="btns">
              <el-select size="mini" :disabled="true"  v-model="errType" placeholder="请选择统计指标">
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
import {
  getErr, getSqlErr
} from '@apis/';
import ErrChart from './components/ErrChart';
import PerfChart from './components/PerfChart';
import MaiDianChart from './components/MaiDianChart';
import PlatformChart from './components/PlatformChart';

import { errTypes, perfTypes } from './data'

export default {
  components: { ErrChart, PerfChart, MaiDianChart, PlatformChart },
  data() {
    return {
      errTypes,
      perfTypes,
      errType: 1,
      perfType: '',
      errChartData: []
    };
  },
  methods: {
    async handleErrTypeChange() {
      let reqData = {
        errType: this.errType
      }
      try {
        // let res = await getErr(reqData);
        let res = await getSqlErr(reqData);
        if (res.data.list.length) {
          this.errChartData = res.data.list.map(item => {
            item.percent = Number((item.count / res.data.total).toFixed(2))
            return item;
          })
        }
        console.log('res 请求了', res);
      } catch(err) {

      }
    }
  },
  created() {
    this.handleErrTypeChange();
    console.log(aadd)
  }
};
</script>

<style lang="scss" scoped>
.home {
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
        margin-bottom: 10px;
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