<!--
 * @Author: wangshengxian
 * @Date: 2020-11-09 14:45:27
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-09 17:03:08
 * @Desc: 自定义省市区三级联动
-->
<template>
  <div class="area-componets">
    <van-popup v-model="dialogVisible" position="bottom">
      <van-picker
        show-toolbar
        title="请选择地区"
        value-key="name"
        :columns="areaList"
        @change="onAreaChange"
        @cancel="onCancel"
        @confirm="onConfirm"
      >
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import imApi from '@/api/imApi'
export default {
  name: '',
  data() {
    return {
      areaList: [{ values: [] }, { values: [] }], //自定义数据三级结构
      // areaList: [{ values: [] }, { values: [] }, { values: [] }], //自定义数据三级结构
      areaData: {
        country: '中国',
        province: '',
        city: '',
        area: ''
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  created() {},
  mounted() {
    this.getAreaData(7, 0)
  },
  methods: {
    onConfirm(values) {
      console.log(values)
      if (!values[1] || !values[1].code) {
        this.$toast('请选择完整地址')
        return
      }
      this.areaData.province = values[0].name
      this.areaData.city = values[1].name
      this.$emit('confirm', this.areaData)
      this.dialogVisible = false
    },
    onCancel() {
      this.dialogVisible = false
    },
    onAreaChange(picker, values, index) {
      console.log(picker, values, index)
      const pid = values[index].id
      console.log('-pid-', pid)
      if (index < 1 && pid) {
        this.getAreaData(pid, index + 1)
      }
    },
    getAreaData(parentId, index) {
      const params = { pid: parentId }
      imApi.getAddressInfo(params).then(res => {
        console.log('-res-', res)
        const list = res.data
        this.areaList[index].values = [{ name: '请选择' }, ...list]
        console.log(this.areaList)
      })
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
