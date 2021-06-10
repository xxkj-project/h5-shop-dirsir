<!--
 * @Author: wangshengxian
 * @Date: 2020-10-29 15:19:22
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-24 18:30:01
 * @Desc: 关于我们
-->
<template>
  <div class="aboutus-page">
    <headerBar :isMainFullScreen="true" background="rgba(0,0,0,0)" :titleOpacity="0" />
    <div class="main" :style="{ height: mainHeight }">
      <div class="top"></div>
      <div class="center">
        <span class="txtBg"></span>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    mainHeight() {
      // console.log(window.innerHeight)
      return window.innerHeight + 'px'
    }
  },
  created() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 300)
  },
  mounted() {},
  methods: {},
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/explain/';

.aboutus-page {
}

.main {
  position: relative;
  width: 100%;
  background: url('@{imgUrl}mainBg.png') no-repeat center;
  background-size: 100% 100%;

  .top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 160px;
    background: url('@{imgUrl}topBg.png') no-repeat center;
    background-size: 100% 100%;
  }

  .center {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 130px;

    .txtBg {
      width: 346px;
      height: 336px;
      background: url('@{imgUrl}txtBg1.png') no-repeat center;
      background-size: 100% 100%;
    }
  }

  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 186px;
    background: url('@{imgUrl}bottomBg.png') no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
