<template>
  <div class="err-detail">
    <LayoutHeader>
      <TimerSelector :timeRange.sync="queryData.timeRange" />
    </LayoutHeader>

    <!-- 走势图 -->
    <TrendChart :chartData="trendChartData" />
    <!-- <img src="http://404.png"> -->

    <!-- <div class="action-box">
      <el-button @click=""  type="primary" size="small">刷新</el-button>
    </div>-->

    <div class="main-box">
      <el-table :max-height="600" :data="tableData" border style="width: 100%;">
        <el-table-column align="center" type="index" label="#"></el-table-column>
        <el-table-column align="center" prop="name" label="NAME"></el-table-column>
        <el-table-column align="center" prop="message" label="MESSAGE" width="300"></el-table-column>
        <el-table-column align="center" prop="url" label="URL" width="200"></el-table-column>
        <el-table-column align="center" prop="errorType" label="TYPE" width="100"></el-table-column>
        <el-table-column align="center" prop="browser" label="BROWSER"></el-table-column>
        <el-table-column align="center" prop="os" label="OS"></el-table-column>
        <el-table-column align="center" prop="host" label="IP"></el-table-column>
        <el-table-column align="center" prop="createdAt" label="TIME" width="115"></el-table-column>

        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="goDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button type="text" size="small" @click="delErrDetail(scope)">删除</el-button>
            <el-button type="text" size="small" @click="createErr">error</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryData.pageNo"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import UaParser from 'ua-parser-js';
import { getErrList, getErrTrand, delErrDetail } from '@apis/';

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
        timeRange: 30
      },
      trendChartData: [],
      total: 0
    };
  },
  watch: {
    'queryData.timeRange'(newVal) {
      this.queryData.pageSize = 10;
      this.queryData.pageNo = 1;
      this.getErrTrand();
      this.getErrList();
    }
  },
  methods: {
    createErr() {
      // console.log('相同的error', equalErr);
      Promise.reject('promiseErr');
    },
    goDetail({ id }) {
      let query = {
        id
      };
      this.$router.push({ name: 'ErrDetail', query });
    },
    async delErrDetail(scope) {

      let { $index } = scope;
      let { id } = scope.row;

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let res = await delErrDetail({ id });
            if (res) {
              // 成功从当前列表删除该元素
              this.tableData.splice($index, 1);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.getErrList();
    },
    handleCurrentChange(val) {
      this.queryData.pageNo = val;
      this.getErrList();
    },
    async getErrList() {
      try {
        let res = await getErrList(this.queryData);
        if (res && res.code === 0) {
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
          this.total = res.data.total;
        }
      } catch (err) {}
    },
    async getErrTrand() {
      try {
        let query = {
          timeRange: this.queryData.timeRange
        };
        let res = await getErrTrand(query);
        this.trendChartData = res.data;

        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.getErrList();
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