<!--
  全局header
-->
<template>
  <div class="header" :style="{ height: headerHeight }">
    <div class="headerLine" :style="{ height: lineHeight }"></div>
    <div
      class="header-global"
      :class="{ header_bottom_shadow: isNeedShadow }"
      ref="headerRef"
      :style="{ paddingTop: headerPaddingTop }"
    >
      <div class="leftWrap fx-align-center" :style="{ top: leftIconTop }">
        <span class="leftIcon" @click="goBack"></span>
      </div>

      <div class="headTitle" :style="{ opacity: opacity }">商品详情</div>

      <div class="right fx-center" :style="{ top: rightTop }">
        <icon-cart />
      </div>
    </div>
  </div>
</template>

<script>
import iconCart from '@/components/searchBar/iconCart'
import platform from '@/native/platform'
import { mapState } from 'vuex'
import openNative from '@/native/openNative'
export default {
  name: '',
  data() {
    return {
      remBase: 41.4
    }
  },
  props: {
    opacity: {
      type: String,
      default: '0'
    },
    // 自定义按钮返回事件
    onBack: {
      type: Function
    },

    // 主题内容是否全屏
    isMainFullScreen: {
      type: Boolean,
      default: false
    },

    // 是否需要顶部状态栏
    isNeedStatusBar: {
      type: Boolean,
      default: true
    },
    isNeedShadow: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState('app', ['statusBarHeight']),
    // header高度 == title + 状态栏
    headerHeight() {
      let hei = this.isMainFullScreen ? +this.statusBarHeight : +this.statusBarHeight + 54
      // console.log('-statusBarHeight-', hei)
      return hei / this.remBase + 'rem'
    },
    // header状态栏高度
    lineHeight() {
      return this.statusBarHeight / this.remBase + 'rem'
    },
    headerPaddingTop() {
      return this.statusBarHeight / this.remBase + 'rem'
    },
    leftIconTop() {
      return this.statusBarHeight / this.remBase + 'rem'
    },
    rightTop() {
      return this.statusBarHeight / this.remBase + 'rem'
    }
  },
  methods: {
    onJumpCart() {
      this.$router.replace('/cart')
    },
    goBack() {
      if (this.onBack) {
        this.onBack()
        return
      }
      if (this.$route.path == '/index') {
        console.log('-返回客户端-')
      } else {
        this.$router.go(-1)
      }
    }
  },
  components: { iconCart }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
// header高度
@height: 54px;
// 客户端状态栏预留高度
@statusBarHeight: 20px;
// // 基础设计去图375，蓝湖标准设计图750 需要除以2
// @multiple: 0.5;
// 图片路径
@imgComUrl: '~@/assets/images/com/';

.header {
  width: 100%;
  .headerLine {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    margin: auto;
    width: 100%;
  }
}
.header-global {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: @height;
  // background-color: rgba(0, 0, 0, 0.2);
  // background: #fff;
  text-align: center;
  line-height: @height;
  color: #171717;
  font-size: 18px;
  box-sizing: content-box;
  &.header_bottom_shadow {
    box-shadow: 4px 4px 10px rgba(250, 248, 248, 0.5);
  }
}
.leftWrap {
  position: absolute;
  left: 15px;
  top: 0;
  z-index: 10;
  height: @height;

  .leftIcon {
    width: 30px;
    height: 30px;
    background: url('@{imgComUrl}icon-left-arrow2.png') no-repeat center / cover;
  }
}

.headTitle {
  background: #fff;
}

.right {
  position: absolute;
  right: 15px;
  top: 0;
  z-index: 10;
  height: @height;
  font-size: 14px;
}
</style>
