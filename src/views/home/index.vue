<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <van-notice-bar
        left-icon="volume-o"
        text="欢迎使用"
      />
      <div v-if='isLogin'>
        <div class="list">
          <div class="logo" :style="{backgroundImage: 'url(' + avatar + ')'}"></div>
          <div class="demo-home__title">昵称</div>
        </div>

        <van-cell-group>
          <!-- <van-cell title="昵称" value="nickName" /> -->
          <van-cell title="股权利益" value="6000" label="描述信息" />
          <van-cell title="明日工资" value="6000" label="描述信息" />
          <van-cell title="我的收益" value="6000" label="描述信息" />
        </van-cell-group>
      </div>

      <div v-else style="text-align: center;padding: 20px 0;">
        <van-button type="info" is-link to="Login">登录</van-button>
      </div>

      <van-cell-group title="新闻资讯">
        <van-cell class="changeNewsItem" title="31省区市新增确诊21例 含本土9例" is-link url="/vant/mobile.html" />
        <!-- <van-cell class="changeNewsItem" title="31省区市新增确诊21例 含本土9例" is-link url="/vant/mobile.html" /> -->
        <!-- <van-cell class="changeNewsItem" title="31省区市新增确诊21例 含本土9例" is-link url="/vant/mobile.html" /> -->
        <!-- <van-cell class="changeNewsItem" title="路由跳转" is-link to="index" /> -->
      </van-cell-group>

      <div v-if="isLogin">
        <van-grid :column-num="3">
          <van-grid-item icon="cash-back-record" text="申请提现" to="/getCash"/>
          <van-grid-item icon="setting-o" text="修改密码" to="/resetPwd"/>
          <van-grid-item icon="close" text="安全退出" @click='logout'/>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      isLogin: '',
      avatar: 'https://www.sunniejs.cn/static/weapp/logo.png'
    }
  },

  mounted() { },

  methods: {
    logout() {
      // removeToken()
      this.$router.go(0);
    }
  },
  
  created() {
    this.isLogin = !!getToken()
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
    .changeNewsItem {
      background-color: #f8f8f8;
    }
  }
   .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
      font-size: 14px;
      .demo-home__title {
        margin: 6px 0 6px;
        font-size: 16px;
        .demo-home__title img,
        .demo-home__title span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .item {
        font-size: 14px;
        line-height: 34px;
        a {
          text-decoration: underline;
        }
        .van-button {
          /* vant-ui 元素*/
          background: #ff5500;
        }
      }

      .logo {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        // : url($cdn +'/weapp/logo.png') center / contain no-repeat;
      }
      .wechat {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
}
</style>
