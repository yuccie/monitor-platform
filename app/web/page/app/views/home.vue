<template>
  <div class="home">
    <div class="platform">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">异常监控平台</el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">性能监控平台</el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">埋点统计平台</el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.home {
  .platform {
    margin: 25px;
  }
}
</style>