<template>
    <van-list
    v-model="loading"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
    >
    <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
    <van-cell center title="单元格" value="内容" label="描述信息" />
    </van-list>
</template>

<script>
import { askGetCashHistory } from '@/api/cash.js'
export default {
  data() {
    return {
      list: [],
      error: false,
      loading: false,
    };
  },
  methods: {
    onLoad() {
      askGetCashHistory().then((res) => {
          this.loading = false
          console.log(res)
      });
    },
  },
  created() {
    this.onLoad()
  }
};
</script>
