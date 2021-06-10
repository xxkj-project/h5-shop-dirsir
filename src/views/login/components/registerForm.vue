<!--
 * @Author: wangshengxian
 * @Date: 2020-11-09 10:39:18
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-23 13:43:12
 * @Desc: 注册 - components
-->
<template>
  <div class="register-components">
    <van-form validate-trigger="onSubmit" :show-error-message="false" @submit="onSubmit">
      <van-field
        v-model="formData.mobile"
        type="tel"
        name="手机号"
        placeholder="请输入手机号"
        clearable
        @blur="onBlur"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />

      <van-field
        v-model="formData.code"
        center
        clearable
        placeholder="请输入验证码"
        @blur="onBlur"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <van-button
            class="codeBtn fx-center"
            native-type="button"
            type="primary"
            size="mini"
            @click.stop="onSendCode"
            v-if="isShowBtn"
            >{{ codeBtnTxt }}</van-button
          >
          <p class="countTime fx-center" v-else>{{ countTime }}S</p>
        </template>
      </van-field>
      <van-field
        v-model="formData.account"
        name="账号"
        placeholder="请输入账号"
        clearable
        @blur="onBlur"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
        v-model="formData.pass"
        type="password"
        name="密码"
        placeholder="请输入密码"
        clearable
        @blur="onBlur"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div class="btnBox">
        <van-button
          class="registerBtn"
          :class="{ regBtnHigh: isRegisterBtnHigh }"
          round
          block
          type="info"
          native-type="submit"
        >
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import api from '@/api/user'
import { validCellphone } from '@/utils/validate'
import { mapGetters } from 'vuex'
import cookie from '@/utils/cookies'
import md5 from 'js-md5'
export default {
  name: '',
  data() {
    return {
      isShowBtn: true,
      countTime: 60,
      codeBtnTxt: '获取验证码',
      isRegisterBtnHigh: false,
      formData: {
        mobile: '',
        code: '',
        account: '',
        pass: ''
      }
    }
  },
  computed: {
    ...mapGetters('user', ['code'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onBlur() {
      // console.log(this.formData)
      let vals = Object.values(this.formData).filter(val => !val)
      console.log(vals)
      if (vals.length === 0) {
        this.isRegisterBtnHigh = true
      } else {
        this.isRegisterBtnHigh = false
      }
    },
    onSendCode() {
      // console.log('发送验证码',this.formData.mobile)
      if (!validCellphone(this.formData.mobile)) {
        this.$toast('请输入正确的手机号!')
        return
      }
      const params = { mobile: this.formData.mobile, type: '1' }
      api
        .sendCode(params)
        .then(res => {
          console.log('-res-', res)
          this.isShowBtn = false
          let timer = setInterval(() => {
            this.countTime--
            if (this.countTime < 0) {
              clearInterval(timer)
              this.isShowBtn = true
              this.codeBtnTxt = '重新获取'
              this.countTime = 60
            }
          }, 1000)
        })
        .catch(err => {
          console.log('-err-', err)
          this.$toast(err.msg)
        })
    },
    onSubmit() {
      console.log('-submit-', this.code)
      const params = { agentCode: this.code, ...this.formData }
      params.pass = md5(params.pass)
      console.log('-params-', params)
      this.$pageLoading.show('加载中...')
      api
        .mobileRegister(params)
        .then(res => {
          console.log('-res-', res)
          this.$pageLoading.hide()
          const { username, pass } = res.data
          this.$emit('success')
          this.$toast('注册成功!')
        })
        .catch(err => {
          this.$pageLoading.hide()
        })
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.codeBtn {
  /deep/ &.van-button--mini {
    width: 90px;
    background: #fff;
    line-height: 30px;
    font-size: 16px;
    color: #5fc0a3;
    border: none;
  }
}

.countTime {
  width: 90px;
  line-height: 30px;
  font-size: 16px;
}

.btnBox {
  padding-top: 36px;
  .registerBtn {
    background: #d2d4d9;
    border: none;

    &.regBtnHigh {
      background: #5fc0a3;
    }
  }
}

.van-form {
  /deep/ .van-cell {
    padding: 24px 0 16px;
    line-height: 30px;
    // border-bottom: 1px solid #efeff1;

    .van-field__body {
      display: flex;
      align-items: center;
    }
    .van-field__control {
      font-size: 18px;
    }
  }
}
</style>
