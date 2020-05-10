<template>
  <div class="home">
    <div class="platform">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            <p>异常监控平台</p>
            <PlatformChart />
            <div class="btns">
              <el-button type="text" class="button">查看详情</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <p>性能监控平台</p>
            <PlatformChart />
            <div class="btns">
              <el-button type="text" class="button">查看详情</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <p>埋点统计平台</p>
            <PlatformChart />
            <div class="btns">
              <el-button type="text" class="button">查看详情</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PlatformChart from './components/PlatformChart';
export default {
  components: { PlatformChart },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.home {
  /deep/ .platform {
    margin: 25px;
    .el-card {
      height: 400px;

      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>