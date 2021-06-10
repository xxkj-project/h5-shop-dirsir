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
      :style="{ paddingTop: headerPaddingTop, background: background }"
    >
      <div class="leftWrap fx-center" :style="{ top: leftIconTop }">
        <span class="leftIcon" @click="goBack"></span>
      </div>

      <!-- TODO: 点击购物车边上会直接打开搜索栏，需要优化 -->
      <div class="searchWrap">
        <template v-if="type === 'noSearch'">
          <div class="searchBox fx-align-center" :style="{ background: searchInputBgColor }" @click="onJumpSearchPage">
            <span class="searchIcon"></span>
            <p>搜索</p>
          </div>
        </template>
        <template v-else>
          <van-field
            class="searchBox searchInput"
            :style="{ background: searchInputBgColor }"
            v-model="searchVal"
            clearable
            placeholder="搜索关键字"
            @clear="onSearchClear"
          ></van-field>
        </template>
      </div>

      <div class="right fx-center" :style="{ top: rightTop }">
        <template v-if="type === 'search'">
          <p @click="onSearch">搜索</p>
        </template>
        <template v-else>
          <icon-cart />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import iconCart from './iconCart'
import platform from '@/native/platform'
import { mapState } from 'vuex'
import openNative from '@/native/openNative'
export default {
  name: '',
  data() {
    return {
      remBase: 41.4,
      searchVal: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'noSearch'
    },
    background: {
      type: String,
      default: '#fff'
    },
    searchInputBgColor: {
      type: String,
      default: '#F0F1F3'
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

    // 自定义按钮返回事件
    onBack: {
      type: Function
    },

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
  created() {},
  mounted() {
    console.log('测试一下v1.1')
  },
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
    onJumpSearchPage() {
      this.$router.push({ name: 'Search' })
    },
    onSearch() {
      console.log('-search-val', this.searchVal)
      this.$emit('search', this.searchVal)
    },
    onSearchClear() {
      this.$emit('clear')
    },
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
  .highColor {
    background: #fff;
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
  width: 30px;
  height: @height;

  .leftIcon {
    width: 30px;
    height: 30px;
    background: url('@{imgComUrl}icon-left-arrow1.png') no-repeat center;
    background-size: 100% 100%;
  }
}

.searchWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: @height;
  .searchBox {
    width: 276px;
    height: 36px;
    border-radius: 18px;
    color: #d2d4d9;
    font-size: 14px;

    .searchIcon {
      width: 16px;
      height: 16px;
      background: url('@{imgComUrl}icon-search.png') no-repeat center / cover;
      margin: 0 8px 0 16px;
    }
  }
}

.right {
  position: absolute;
  right: 15px;
  top: 0;
  z-index: 10;
  height: @height;
  font-size: 16px;
}
</style>
