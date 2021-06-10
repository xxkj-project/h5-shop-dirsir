<!--
 * @Author: wangshengxian
 * @Date: 2020-10-20 10:09:56
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-15 12:29:10
 * @Desc: layout布局
-->
<template>
  <div class="layout">
    <!-- <div class="layout-header" v-show="!hiddenHeader">
      <headerBar> </headerBar>
    </div> -->
    <div class="layout-main">
      <transition name="loading-transition">
        <keep-alive :include="cacheModules">
          <router-view class="app-view" v-if="isRouterAlive" :key="key" />
        </keep-alive>
      </transition>
    </div>
    <div class="layout-footer" v-show="showFooter">
      <footerNav />
    </div>
    <backTop />
  </div>
</template>

<script>
// import headerBar from './headerBar'
import footerNav from './footerNav'
import backTop from './backTop'
import { mapState } from 'vuex'
export default {
  name: '',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
      // 初始过度动画方向
      transitionName: 'slide-right',
      routerName: ['Index', 'My']
    }
  },
  computed: {
    ...mapState('global', ['direction', 'cacheModules']),
    ...mapState('settings', ['hiddenHeader', 'showFooter']),
    key() {
      return this.$route.path
    }
  },
  created() {
    console.log('提交版本 v2020.12.08')
    // TODO: 后面该组件需要优化，
  },
  mounted() {
    this.$nextTick(() => {
      console.log('-cache-', Array.from(this.cacheModules), '', this.hiddenHeader, this.showFooter)
    })
  },
  watch: {
    $route(to, from) {
      // console.log(to, from)
      this.setAni(to, from)
      this.setCacheModule(to, from)
      this.setHeader(to)
      this.setFooter(to)
      this.setFootActIdx(to)
    }
  },
  methods: {
    // 重新加载当前页
    reload() {
      console.log('重新加载...')
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    setHeader(to) {
      let bool = !!to.meta.hiddenHeader
      // console.log('-bool-', bool)
      this.$store.commit('settings/setHiddenHeader', bool)
    },
    // 设置footer的显示
    setFooter(to) {
      let bool = !!to.meta.showFooter
      // console.log('-bool-', bool)
      this.$store.commit('settings/setShowFooter', bool)
    },
    setFootActIdx(to) {
      if (this.routerName.includes(to.name)) {
        let idx = to.name === 'Index' ? 0 : 1
        // console.log('-foot-act-idx-', idx)
        this.$store.commit('settings/setFootActIdx', idx)
      }
    },
    // 设置打开页面动画
    setAni(to, from) {
      // console.log('direction:', this.direction)
      this.transitionName = this.direction === 'backward' ? 'slide-left' : 'slide-right'
    },
    // 设置缓存组件
    setCacheModule(to, from) {
      // console.log('-cache-modules-', this.cacheModules)
      // this.cacheModules = this.cacheModules
    }
  },
  components: { footerNav, backTop }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/com/';

.layout {
  height: 100%;

  .layout-header {
  }

  .layout-footer {
    height: 70px;
  }

  .layout-main {
    // overflow-y: auto;
  }
}

.app-view {
  // width: 100%;
  // height: 100%;
  // overflow-y: auto;
}

.loading-transition-enter {
  opacity: 1;
}
.loading-transition-leave-active {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
