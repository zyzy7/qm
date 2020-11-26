<template>
  <div class="dev">
    <div class="main">
      <ul>
          <li class="inputWrap">
            <input type="text" v-model="form.fullname" placeholder="收款人姓名"/>
          </li>
          <li class="inputWrap">
            <input type="text" v-model="form.card_no" placeholder="银行卡号"/>
          </li>
          <li class="inputWrap">
            <input type="text" v-model="form.amount" placeholder="提现金额"/>
          </li>
      </ul>
      <button
      :class="['subBtn', {'disabledBtn': btnFlag}]"
      :disabled = "btnFlag"
      @click= "submit"
      >提交</button>
      <button
      plain hairline
      type="info"
      class='subBtn1'
      @click= "lookHistory"
      >查看提现记录</button>
    </div>
    <transition name="fade">
      <div class="toast" v-if="toastFlag">
        <span class="txt">{{toastMsg}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { askGetCash } from '@/api/cash.js'
export default {
  data () {
    return {
      toastFlag: false,
      toastMsg: '',
      psdType: true,
      form: {
        amount: '',
        fullname: '',
        card_no: ''
      },
      submitFlag: false
    }
  },
  computed: {
    btnFlag () {
      return this.form.password === '' || this.form.mobile === '' || this.submitFlag
    }
  },
  methods: {
    lookHistory () {
      this.$router.push('/cashHistory')
    },    
    clear () {
      this.form.password = ''
    },
    checkType () {
      this.psdType = !this.psdType
    },
    submit () {
      this.submitFlag = true
      askGetCash(this.form).then(res => {
        this.submitFlag = false
        if (!res.code == 200) {
         Toast(res.msg)
         return
        }
        this.lookHistory()
      }).catch(error => {
        // console.log(error)
        this.submitFlag = false
      })
    },
    goRegist () {
      this.$router.push('/regist')
    },
    goResetPsd () {
      this.$router.push('/forgetPwd')
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
    .subBtn, .subBtn1{
      width: 335px;
      height:46px;
      border-radius: 46px;
      color: #fff;
      text-align: center;
      font-size: 18px;
      line-height: 46px;
      margin: 30px auto 10px;
      outline: none;
      border: none;
    }
    .subBtn {
       background-color: #497BEC;
    }
    .subBtn1 {
      background-color: #fff;
      color: #497BEC
    }
    .disabledBtn{
      opacity: 0.4;
    }
  }
</style>