<!--
 * @Author: wangshengxian
 * @Date: 2020-11-16 18:16:47
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-20 10:54:03
 * @Desc: 购物车图标 - components
-->
<template>
  <div class="icon-cart-components">
    <router-link class="headerRight fx-align-center" to="/cart">
      <span class="icon"></span>
      <p class="mark fx-center" v-if="isShowNum">{{ cartNum }}</p>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    ...mapState('cart', ['cartNum']),
    isShowNum() {
      return this.cartNum > 0
    }
  },
  created() {},
  mounted() {},
  methods: {},
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgComUrl: '~@/assets/images/com/';
.headerRight {
  position: relative;
  height: 100%;
  .icon {
    width: 30px;
    height: 30px;
    background: url('@{imgComUrl}icon-cart1.png') no-repeat center / cover;
  }

  .mark {
    position: absolute;
    top: -9px;
    right: -7px;
    height: 18px;
    background: #ffcc7e;
    line-height: 18px;
    color: #fff;
    font-size: 11px;
    border: 2px solid #ffffff;
    border-radius: 9px;
    padding: 0 4px;
  }
}
</style>
