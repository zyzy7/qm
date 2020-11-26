<template>
  <div class="dev">
    <div class="main">
      <h1>账号登录</h1>
      <ul>
          <li class="inputWrap">
            <input type="text" v-model="form.mobile" placeholder="手机号/账号"/>
          </li>

          <li class="inputWrap" v-show="!isByCode">
            <input  :type="psdType? 'password': 'text'" v-model="form.password" placeholder="密码"/>
            <div class="psdImg">
              <span class="close" v-show="form.password !==''" @click="clear">
                  <!-- <img src="@/assets/facePayMobile/images/close.png" /> -->
                  </span>
              <span class="separate" v-show="form.password !==''">|</span>
              <span class="eye" @click='checkType'>
                  <!-- <img src="@/assets/facePayMobile/images/eye_closed.png" v-if="psdType"/> -->
                  <!-- <img src="@/assets/facePayMobile/images/eye_opened.png" v-else/> -->
              </span>
            </div>
          </li>
     
           <li class="inputWrap" v-show="isByCode">
            <input type="text" v-model="form.verifyCode" placeholder="短信验证码"/>
            <span
              :class="['code',{'code_dis':codeState}]"
              @click="getCode">
              {{codeState?counts+'s重新获取':'获取验证码'}}
            </span>
          </li>
      </ul>

      <div class="forgetPsd" @click="goResetPsd">{{!isByCode ? '验证码登录' : '密码登录'}}</div>
      
      <button
      :class="['subBtn', {'disabledBtn': btnFlag}]"
      :disabled = "btnFlag"
      @click= "submit"
      >登录</button>
    </div>
    <transition name="fade">
      <div class="toast" v-if="toastFlag">
        <span class="txt">{{toastMsg}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { loginByPassword, loginByCode, getCode } from '@/api/user.js'
import { setToken } from '@/utils/auth'
export default {
  data () {
    return {
      toastFlag: false,
      toastMsg: '',
      psdType: true,
      codeState: false,
      counts: 60,
      form: {
        mobile: '13511111111',
        password: '123456',
        verifyCode: ''
      },
      submitFlag: false,
      // 验证码登录
      isByCode: false
    }
  },
  computed: {
    btnFlag () {
      return this.form.password === '' || this.form.mobile === '' || this.submitFlag
    }
  },
  methods: {
    getCode () {
      if (isNaN(this.form.mobile) || this.form.mobile.length !== 11) {
        Toast('手机号请填写11位数字')
        return
      }
      if (!this.codeState) {
        getCode(this.form.mobile).then(res => {
          if(res.code == 200) {
            this.settime()
          } else {
            Toast(res.msg)
          }
        })
      }
    },
    settime () {
      this.codeState = true
      setTimeout(() => {
        if (this.counts === 0) {
          this.counts = 60
          this.codeState = false
          return false
        }
        this.counts = this.counts - 1
        this.settime()
      }, 1000)
    },
    clear () {
      this.form.password = ''
    },
    checkType () {
      this.psdType = !this.psdType
    },
    submit () {
      if (isNaN(this.form.mobile) || this.form.mobile.length !== 11) {
        Toast('手机号请填写11位数字')
        return
      }
      this.submitFlag = true
      // 验证码登录
      let obj = {}
      if(!this.isByCode) {
        obj = {
          phone: this.form.mobile,
          password: this.form.password
        }
        this.logByPassword(obj)
        
      } else {
        obj = {
          phone: this.form.mobile,
          verifyCode: this.form.verifyCode
        }
        this.logByCode(obj)
      }
    },
    logSucs(res) {
      this.submitFlag = false
      if (res.code !== 200) {
      Toast.fail(res.msg);
        return
      }
      const token = res.data.access_token
      this.$store.commit('SET_TOKEN', token)
      setToken(token)
        // sessionStorage.setItem('sessionId', res.value.sessionId) // 登录token
        // sessionStorage.setItem('merchantId', res.value.regMerchantId) // 商户ID
      this.$router.push('/home')
    },
    logErr(res) {
        //     console.log(error)
      Toast.fail('登录失败，请稍后再试');
      this.submitFlag = false
    },
    logByCode(data) {
      loginByCode(data).then((res) => {
        this.logSucs(res)
      }).catch(() => {
        this.logErr(res)
      })
    },
    logByPassword(data) {
      loginByPassword(data).then((res) => {
          this.logSucs(res)
      }).catch((res) => {
        console.log(res)
        this.logErr(res)
      })
    },
    goRegist () {
      this.$router.push('/regist')
    },
    goResetPsd () {
      this.isByCode = !this.isByCode
      this.form.password = ''
      // this.$router.push('/forgetPwd')
    }
  }
}
</script>

<style lang="scss" scoped>
  .dev{
    height: 100%;
    background-color: #fff;
  }
  .main{
    margin:0 20px;
     .code{
        font-size: 14px;
        color: #497BEC;
        position: absolute;
        right: 0;
        top: 40px;
      }
      .code_dis{
        color: #C4C7D1;
      }
    h1{
      font-size: 24px;
      margin: 0 0 10px 0;
      padding-top: 20px;
      font-weight: normal;
    }
    .inputWrap{
      position: relative;
      padding-top: 25px;
      padding-bottom: 1px;
      border-bottom: 1px solid #E7E8EB;
      input {
        font-size: 18px;
        height: 45px;
        width: 80%;
        line-height: 45px;
        outLine: none;
        border: none;
      }
      .psdImg{
        position: absolute;
        right: 0;
        top: 40px;
        display: flex;
        .close{
          width: 20px;
          height: 20px;
          img{width: 100%;}
        }
        .separate{
          color: #E7E8EB;
          padding: 0 7px;
          margin-top: 2.5px;
        }
        .eye{
          width: 20px;
          height: 20px;
          img{width: 100%;}
        }
      }
    }
    .forgetPsd{
      font-size: 14px;
      padding-top: 12px;
    }
    .subBtn{
      width: 335px;
      height:46px;
      border-radius: 46px;
      color: #fff;
      text-align: center;
      font-size: 18px;
      line-height: 46px;
      margin: 30px auto;
      background-color: #497BEC;
      outline: none;
      border: none;
    }
    .disabledBtn{
      opacity: 0.4;
    }
  }
</style>