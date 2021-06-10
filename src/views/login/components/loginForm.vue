<!--
 * @Author: wangshengxian
 * @Date: 2020-11-09 10:39:18
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-02 11:02:38
 * @Desc: 登录 - components
-->
<template>
  <div class="login-components">
    <van-form validate-trigger="onSubmit" :show-error-message="false" @submit="onSubmit">
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
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { validCellphone } from '@/utils/validate'
import api from '@/api/user'
import store from '@/store'
import Cookie from 'js-cookie'
import md5 from 'js-md5'
export default {
  name: '',
  data() {
    return {
      isRegisterBtnHigh: false,
      formData: {
        account: '',
        pass: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onBlur() {
      // console.log(this.formData)
      let vals = Object.values(this.formData).filter(val => !val)
      if (vals.length === 0) {
        this.isRegisterBtnHigh = true
      } else {
        this.isRegisterBtnHigh = false
      }
    },

    onSubmit() {
      console.log('-submit-', this.formData)
      this.$pageLoading.show('加载中...')
      const params = { ...this.formData }
      params.pass = md5(params.pass)
      api
        .logIn(params)
        .then(res => {
          this.$pageLoading.hide()
          console.log('-res-', res)
          const { key, myName, smallPic, bigPic } = res.data
          const userInfo = { myName, smallPic, bigPic }
          // 存储设置为3天
          Cookie.set('key', key, { expires: 3 })
          Cookie.set('userInfo', userInfo, { expires: 3 })
          this.$store.commit('user/setKey', key)
          this.$store.commit('user/setUserInfo', userInfo)
          this.$router.go(-1)
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
