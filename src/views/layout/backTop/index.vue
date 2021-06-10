<!--
 * @Author: wangshengxian
 * @Date: 2020-10-20 10:14:22
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-03 09:47:04
 * @Desc: layout - 返回顶部
-->

<template>
  <div class="layout-backTop" ref="backTopRef" @click="toBackTop">
    <p class="icon">
      <span class="iconfont icon-fanhuidingbu"></span>
    </p>
    <p>顶部</p>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleSrcroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleSrcroll)
  },
  methods: {
    handleSrcroll(e) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      // console.log(document.documentElement.scrollTop, document.body.scrollTop, window.pageYOffset)
      // console.log('-scrollTop-', scrollTop)
      this.$refs.backTopRef.style.opacity = scrollTop > 900 ? 1 : 0
      this.$refs.backTopRef.style.display = scrollTop > 900 ? 'block' : 'none'
      // TODO: 添加了display：block后渐变动画消失，后面再行处理
    },
    toBackTop() {
      this.$refs.backTopRef.style.display = 'none'
      this.$refs.backTopRef.style.opacity = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.pageYOffset = 0
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.layout-backTop {
  position: fixed;
  bottom: 86px;
  right: 10px;
  z-index: 666;
  width: 42px;
  height: 42px;
  background: #fff;
  transition: opacity 0.6s ease;
  // transition: bottom 0.6s ease, opacity 0.6s ease;
  border-radius: 50%;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  opacity: 0;

  .icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-fanhuidingbu {
      font-size: 18px;
    }
  }
  p {
    font-size: 12px;
    color: #333;
    text-align: center;
  }
  &.setBorderAll:after {
    border-color: rgb(139, 136, 136);
    border-radius: 50%;
  }
}
</style>
