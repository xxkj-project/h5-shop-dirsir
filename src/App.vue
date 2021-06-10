<!--
 * @Author: wangshengxian
 * @Date: 2020-10-19 15:35:17
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-02 09:44:21
 * @Desc: 根组件 - components
-->
<template>
  <div id="app">
    <layout />
  </div>
</template>

<script>
import layout from '@/views/layout'
export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {},
  methods: {},
  components: { layout }
}
</script>

<style lang="less">
#app {
  height: 100%;
  font-size: 15px;
  background: #f9fafc;
  -webkit-overflow-scrolling: touch;
}
</style>
