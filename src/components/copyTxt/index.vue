<!--
 * @Author: wangshengxian
 * @Date: 2020-12-04 18:05:27
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-18 18:15:20
 * @Desc: 复制组件 - components
-->
<template>
  <div class="copy-txt-components">
    <div v-clipboard:copy="txt" v-clipboard:success="onCopy" v-clipboard:error="onError" class="copyBtn">
      复制
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // 复制文本
    txt: {
      type: String | Number, // eslint-disable-line
      required: true
    },
    // 是否自定义复制成功事件(默认为false,设置为true的话,需要再定义一个成功处理事件)
    isCustom: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onCopy() {
      if (this.isCustom) {
        this.$emit('success')
        return
      }
      this.$toast('复制成功')
    },
    onError() {
      this.$toast('复制失败')
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.copyBtn {
  color: #5fc0a3;
  margin-left: 10px;
}
</style>
