<!--
 * @Author: wangshengxian
 * @Date: 2020-11-20 15:54:15
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-09 10:51:47
 * @Desc: 搜索页，搜索框组件 - components
-->
<template>
  <div class="search-global">
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

        <div class="searchWrap">
          <van-field
            class="searchBox searchInput"
            :style="{ background: searchInputBgColor }"
            v-model="searchWord"
            clearable
            placeholder="搜索关键字"
            @clear="onSearchClear"
          ></van-field>
        </div>

        <div class="right fx-center" :style="{ top: rightTop }">
          <p @click="onSearch">搜索</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import openNative from '@/native/openNative'
import tools from '@/utils/tools'
import api from '@/api/searchs'
export default {
  name: '',
  data() {
    return {
      remBase: 41.4,
      searchWord: '',
      params: {
        keyword: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  props: {
    background: {
      type: String,
      default: '#fff'
    },
    searchInputBgColor: {
      type: String,
      default: '#F0F1F3'
    },
    // 自定义按钮返回事件
    onBack: {
      type: Function
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
  watch: {
    // 监听输入框的输入情况
    searchWord(newVal, oldVal) {
      console.log('-watch-search-input-', newVal, oldVal)
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState('app', ['statusBarHeight']),
    // header高度 == title + 状态栏
    headerHeight() {
      let hei = +this.statusBarHeight + 54
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
    },
    searchBtnDebounce() {
      return tools.debounce(this.searchBtnFunc, 1000)
    }
  },
  methods: {
    onSearch() {
      console.log('-search-val', this.searchWord)
      this.params.keyword = this.searchWord
      this.searchBtnDebounce()
    },
    onSearchClear() {
      // this.$emit('clear')
      this.isShow = false
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
    },
    searchBtnFunc() {
      const word = this.searchWord.replace(/(^\s*)|(\s*$)/g, '') // 去除空格;
      this.params.keyword = word
      if (word == '' || word == 'undefined' || word == 'null') {
        this.$toast({
          message: '请输入搜索关键字',
          duration: 800
        })
      } else {
        // 手动搜索接口
        console.log('-params-', this.params)
        this.$emit('success', word)
      }
    }
  },
  components: {}
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
    width: 12px;
    height: 20px;
    background: url('@{imgComUrl}icon-left-arrow3.png') no-repeat center / cover;
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

    /deep/ &.van-cell {
      padding: 0 18px;
      line-height: 36px;
    }

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
