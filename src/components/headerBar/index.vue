<!--
 * @Author: wangshengxian
 * @Date: 2020-10-19 15:35:17
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-14 10:37:42
 * @Desc: 全局header组件
-->
<template>
  <div class="header" :style="{ height: headerHeight }">
    <div class="headerLine" :style="{ height: lineHeight }"></div>
    <div
      class="header-global"
      :class="{ header_bottom_shadow: isNeedShadow }"
      ref="headerRef"
      :style="{ paddingTop: headerPaddingTop, backgroundColor: background }"
    >
      <span
        class="leftIcon"
        :class="arrowsType === 'black' ? 'blackArrows' : 'whiteArrows'"
        :style="{ top: leftIconTop }"
        @click="goBack"
      ></span>

      <div class="headTitle" :style="{ opacity: titleOpacity, color: titleColor }">{{ headTitle || routerTitle }}</div>

      <span class="right" :style="{ top: rightTop }">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import platform from '@/native/platform'
import { mapState } from 'vuex'
import openNative from '@/native/openNative'
export default {
  name: '',
  data() {
    return {
      remBase: 41.4,
      routerTitle: ''
    }
  },
  props: {
    background: {
      type: String,
      default: ''
    },
    // 返回箭头颜色，默认为 黑色(black/white)
    arrowsType: {
      type: String,
      default: 'black'
    },
    // 标题的透明度，默认为 1
    titleOpacity: {
      type: Number,
      default: 1
    },
    // 标题字体颜色，默认为 #000
    titleColor: {
      type: String,
      dafault: '#000'
    },
    // 自定义标题
    headTitle: {
      type: String,
      default: ''
    },
    // 自定义按钮返回事件
    onBack: {
      type: Function
    },
    // 返回键后退步数
    backStep: {
      type: Number,
      default: 1
    },
    // 右边slot点击事件
    // onRight: {
    //   type: Function,
    //   default: () => {}
    // },
    // 主题内容是否全屏
    isMainFullScreen: {
      type: Boolean,
      default: false
    },
    // 顶部状态栏是否亮色 ==》亮色状态栏使用h5 header同一颜色，暗色状态栏使用白色，true亮色；false暗色
    isHighColor: {
      type: Boolean,
      default: true
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
  created() {
    this.getTitle()
  },
  mounted() {},
  computed: {
    ...mapState('app', ['statusBarHeight']),
    // header高度 == title + 状态栏
    headerHeight() {
      let hei = this.isMainFullScreen ? +this.statusBarHeight : +this.statusBarHeight + 54
      // console.log('-headerHeight-', hei)
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
      return (+this.statusBarHeight + 17) / this.remBase + 'rem'
    },
    rightTop() {
      return this.statusBarHeight / this.remBase + 'rem'
    }
  },
  methods: {
    getTitle() {
      if (this.$route.meta) {
        this.routerTitle = this.$route.meta.title || ''
      }
    },
    goBack() {
      if (this.onBack) {
        this.onBack()
        return
      }
      if (this.$route.path == '/index') {
        console.log('-返回客户端-')
      } else {
        this.$router.go(`-${this.backStep}`)
      }
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
// 蓝湖标准设计图414
// header高度
@height: 54px;
// 客户端状态栏预留高度
@statusBarHeight: 20px;
// 图片路径
@imgUrl: '~@/assets/images/com/';

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
  .highColor {
    background: #fff;
  }

  .header-global {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: @height;
    background-color: #fff;
    text-align: center;
    line-height: @height;
    color: #292929;
    font-family: PingFangSC-Medium, PingFang SC;
    // font-family: PingFang-SC-Bold;
    font-size: 18px;
    box-sizing: content-box;
    .leftIcon {
      position: absolute;
      left: 25px;
      top: 17px;
      z-index: 10;
      width: 12px;
      height: 20px;
      &.blackArrows {
        background: url('@{imgUrl}icon-left-arrow3.png') no-repeat center / cover;
      }
      &.whiteArrows {
        background: url('@{imgUrl}icon-left-arrow4.png') no-repeat center / cover;
      }
    }
    .right {
      position: absolute;
      right: 15px;
      top: 0;
      z-index: 10;
      font-size: 14px;
    }
  }
}
.header-global {
  &.header_bottom_shadow {
    box-shadow: 4px 4px 10px rgba(250, 248, 248, 0.5);
  }
}
</style>
