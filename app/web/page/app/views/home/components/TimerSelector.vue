<template>
  <el-select class="time-select" size="small" v-model="cTimeRange" placeholder="请选择" @change="change">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    timeRange: {
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      // 避免v-model直接绑定props
      cTimeRange: this.timeRange,
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
          value: 7,
          label: '最近7天'
        },
        {
          value: 14,
          label: '最近14天'
        },
        {
          value: 30,
          label: '最近30天'
        },
      ],
    };
  },
  methods: {
    change(newRange) {
      this.$emit('update:timeRange', newRange);
    }
  }
};
</script>

<style lang="scss" scoped>
.time-select {
  margin-right: 15px;
}
</style>