<template>
  <el-select class="time-select" size="small" v-model="value" placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      options: [
        // {
        //   value: '选项1',
        //   label: '今天'
        // },
        // {
        //   value: '选项1',
        //   label: '昨天'
        // },
        {
          value: '选项2',
          label: '最近7天'
        },
        {
          value: '选项3',
          label: '最近14天'
        },
        {
          value: '选项4',
          label: '最近30天'
        },
      ],
      value: ''
    };
  }
};
</script>

<style lang="scss" scoped>
.time-select {
  margin-right: 15px;
}
</style>