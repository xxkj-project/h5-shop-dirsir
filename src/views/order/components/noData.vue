<!--
 * @Author: wangshengxian
 * @Date: 2020-11-16 17:27:49
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-16 17:37:04
 * @Desc: 没有数据 - components
-->
<template>
  <div class="nodata-components">
    <div class="compContainer fx-column-center">
      <span class="icon"></span>
      <p>暂无数据</p>
    </div>
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
  mounted() {},
  methods: {},
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgComUrl: '~@/assets/images/com/';

.compContainer {
  padding-top: 160px;

  .icon {
    width: 136px;
    height: 136px;
    background: url('@{imgComUrl}icon-no-data.png') no-repeat center / cover;
  }

  p {
    line-height: 22px;
    color: #d2d4d9;
    padding-top: 12px;
  }
}
</style>
