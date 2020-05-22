<template>
  <div class="err-detail">
    <LayoutHeader>
      <TimerSelector :timeRange.sync="queryData.timeRange"/>
    </LayoutHeader>
    
    <!-- 走势图 -->
    <TrendChart :chartData="trendChartData"/>

    <!-- <div class="action-box">
      <el-button @click=""  type="primary" size="small">刷新</el-button>
    </div> -->

    <div class="main-box">
      <el-table :max-height="600" :data="tableData" border style="width: 100%;">
        <el-table-column align="center" type="index" label="#"></el-table-column>
        <el-table-column align="center" prop="name" label="NAME"></el-table-column>
        <el-table-column align="center" prop="content" label="MESSAGE" width="300"></el-table-column>
        <el-table-column align="center" prop="url" label="URL" width="200"></el-table-column>
        <el-table-column align="center" prop="errorType" label="TYPE" width="100"></el-table-column>
        <el-table-column align="center" prop="browser" label="BROWSER"></el-table-column>
        <el-table-column align="center" prop="os" label="OS"></el-table-column>
        <el-table-column align="center" prop="host" label="IP"></el-table-column>
        <el-table-column align="center" prop="createdAt" label="TIME" width="115"></el-table-column>

        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="goDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryData.pageNo"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import UaParser from 'ua-parser-js';
import { getSqlErr, getErrTrand } from '@apis/';

import TrendChart from './components/TrendChart';
import LayoutHeader from '@layoutApp/header/header';
import TimerSelector from '../components/TimerSelector';

import { tableData } from './data';

export default {
  components: { TrendChart, LayoutHeader, TimerSelector },
  data() {
    return {
      tableData,
      queryData: {
        pageSize: 10,
        pageNo: 1,
        timeRange: 7
      },
      trendChartData: []
    };
  },
  watch: {
    'queryData.timeRange'(newVal) {
      this.getErrTrand();
    }
  },
  methods: {
    goDetail(row) {
      this.$router.push({ name: 'ErrDetail' });
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.handleErrTypeChange();
    },
    handleCurrentChange(val) {
      this.queryData.pageNo = val;
      this.handleErrTypeChange();
    },
    async handleErrTypeChange() {

      try {
        let res = await getSqlErr(this.queryData);
        if (res.code === 0) {

          this.tableData = res.data.list.map(item => {
            if (item.userAgent) {
              let UA = UaParser(item.userAgent);
              item.browser = UA.browser.name;
              item.os = UA.os.name;
              item.engine = UA.engine.name;
            }

            item.createdAt = new Date(Number(item.timestamp)).toLocaleString();
            return item;
          });
        }
      } catch (err) {}
    },
    async getErrTrand() {
      try {
        let query = {
          timeRange: this.queryData.timeRange
        };
        let res = await getErrTrand(query);
        let leftArr = Array(17).fill(0).map((item, idx) => {
          return {
            count: Math.floor(Math.random()*100),
            date: `2020-05-${idx + 1}`
          }
        })
        this.trendChartData = leftArr.concat(res.data);

        console.log(res);
      } catch(err) {
        console.log(err);
      }
    }
  },
  created() {
    this.handleErrTypeChange();
    this.getErrTrand();
  }
};
</script>

<style lang="scss" scoped>
.err-detail {
  padding: 25px 50px;

  .main-box {
    margin-top: 25px;

    .pagination-box {
      display: flex;
      flex-direction: row-reverse;
      margin: 15px 15px 25px 0;
    }
  }
}
</style>