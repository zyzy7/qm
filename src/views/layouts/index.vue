<template>
  <div class="app-container">
    <div class="layout-content">
      <van-nav-bar
        :title="pageName"
        left-text="返回"
        right-text="刷新"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '个人',
          to: {
            name: 'Home'
          },
          icon: 'user-o'
        },
        {
          title: '团队',
          to: {
            name: 'About'
          },
          icon: 'friends-o'
        }
      ]
    }
  },
  components: {
    TabBar
  },
  computed: {
    pageName() {
      return this.$route.meta.title
    },
  },
  methods: {
    handleChange(v) {
      console.log('tab value:', v)
    },
    onClickLeft() {
       this.$router.go(-1);//返回上一层
    },
    onClickRight() {
      this.$router.go(0);
    }
  }
}
</script>
