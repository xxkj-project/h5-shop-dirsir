<!--
 * @Author: wangshengxian
 * @Date: 2020-10-20 09:54:05
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-25 14:45:47
 * @Desc: layout - 底部导航栏
-->
<template>
  <div class="footer-nav">
    <div class="navWrap">
      <router-link
        class="item fx-column-center"
        :class="{ isActive: footActIdx === index }"
        :to="index === 0 ? item.path + '/' + code : item.path"
        v-for="(item, index) in list"
        :key="index"
      >
        <span class="icon" :class="'icon' + '_' + index"></span>
        <p class="title">{{ item.title }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      list: [
        { path: '/index', title: '商城', iconfont: 'icon-shangcheng' },
        { path: '/my', title: '我的', iconfont: 'icon-my' }
      ]
    }
  },
  computed: {
    ...mapState('settings', ['footActIdx']),
    ...mapState('user', ['code'])
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      console.log(this.footActIdx)
    })
  },
  methods: {},
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/com/';
.footer-nav {
  height: 70px;
}

.navWrap {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 70px;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

  .item {
    width: 50%;
    color: #d2d4d9;

    .icon {
      width: 24px;
      height: 24px;

      &.icon_0 {
        background: url('@{imgUrl}icon-footer-no-mall.png') no-repeat center / cover;
      }
      &.icon_1 {
        background: url('@{imgUrl}icon-footer-no-my.png') no-repeat center / cover;
      }
    }
  }
  .isActive {
    color: #5fc0a3;

    .icon {
      &.icon_0 {
        background: url('@{imgUrl}icon-footer-mall.png') no-repeat center / cover;
      }
      &.icon_1 {
        background: url('@{imgUrl}icon-footer-my.png') no-repeat center / cover;
      }
    }
  }
}
</style>
