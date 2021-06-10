<!--
 * @Author: wangshengxian
 * @Date: 2020-11-09 10:39:18
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-11 10:18:38
 * @Desc: login - page
-->
<template>
  <div class="login-page">
    <div class="main">
      <div class="top">
        <img src="@/assets/images/com/topBg.png" alt="" />
      </div>
      <div class="bottom">
        <van-tabs
          v-model="type"
          :line-width="tabsStyle.lineWidth"
          :line-height="tabsStyle.lineHeight"
          :title-active-color="tabsStyle.actColor"
          :title-inactive-color="tabsStyle.initColor"
        >
          <van-tab title="登录" name="login">
            <loginForm />
          </van-tab>
          <van-tab title="注册" name="register">
            <registerForm @success="handleSuccess" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from './components/loginForm'
import registerForm from './components/registerForm'
export default {
  name: '',
  data() {
    return {
      type: 'login',
      tabsStyle: {
        lineWidth: '40px',
        lineHeight: '2px',
        initColor: '#D2D4D9',
        actColor: '#5FC0A3'
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSuccess() {
      this.type = 'login'
    }
  },
  components: { loginForm, registerForm }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.login-page {
  width: 100%;

  .top {
    width: 100%;

    img {
      display: block;
      width: 100%;
    }
  }

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 450px;
    background: #fff;
    border-radius: 24px 24px 0 0;
    padding: 20px 30px 0;
  }
}

/deep/ .van-tab {
  font-size: 20px;
}
</style>
