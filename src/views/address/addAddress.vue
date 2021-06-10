<!--
 * @Author: wangshengxian
 * @Date: 2020-10-28 14:23:10
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-15 17:31:35
 * @Desc: 新增收货地址
-->
<template>
  <div class="add-address-page">
    <headerBar />
    <div class="main">
      <div class="container">
        <van-form class="formWrap" @submit="onSubmit">
          <van-field
            v-model="formData.areaText"
            name="地区选择"
            label="地区选择"
            :loading="true"
            placeholder="点击选择省市区"
            :rules="[{ required: true, message: '请选择地区' }]"
            @click="onOpenArea"
          />
          <van-field
            v-model="formData.detailAddress"
            name="详细地址"
            label="详细地址"
            placeholder="详细地址，如街道、楼牌号等"
            :rules="[{ required: true, message: '请填写详细地址' }]"
          />
          <van-field
            v-model="formData.name"
            name="姓名"
            label="姓名"
            placeholder="姓名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            class="itemMobile"
            v-model="formData.mobile"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />

          <div class="bottom fx-align-center">
            <span class="icon" :class="isDefault | filterClass" @click="onChecked"></span>
            <p>设置默认地址</p>
          </div>

          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>

    <areaPopup :visible.sync="isArea" @confirm="handleAreaConfirm" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import areaPopup from './components/areaPopup'
import api from '@/api/address'
import { validCellphone, validSpecialStr } from '@/utils/validate'
export default {
  name: '',
  data() {
    return {
      isDefault: false,
      isArea: false,
      formData: {
        areaText: '',
        detailAddress: '',
        name: '',
        mobile: ''
      },
      addressData: {}
    }
  },
  computed: {},
  filters: {
    filterClass(val) {
      return val ? 'icon-select' : 'icon-no-select'
    }
  },
  created() {},
  mounted() {},
  methods: {
    onOpenArea() {
      this.isArea = true
    },
    handleAreaConfirm(data) {
      // TODO: 目前只有省市，没有区
      console.log(data)
      this.addressData = data
      this.formData.areaText = data.province + '，' + data.city
      // console.log(this.formData.areaText)
    },
    onChecked() {
      this.isDefault = !this.isDefault
    },
    onSubmit() {
      // TODO: 缺一个手机号11位验证器
      console.log('-submit-')
      const { name, mobile, detailAddress } = this.formData
      if (!validCellphone(mobile)) {
        this.$toast('手机号格式不对！')
        return
      }
      // TODO: 用户名不能有特殊符号
      if (validSpecialStr(name)) {
        this.$toast('用户名不能有特殊符号！')
        return
      }

      let defaultAddress = this.isDefault ? 1 : 0
      const params = { name, mobile, detailAddress, defaultAddress, ...this.addressData }
      console.log('-params-', params)

      this.$pageLoading.show('加载中...')
      api
        .addAddress(params)
        .then(res => {
          console.log('-res-', res)
          this.$pageLoading.hide()
          this.$toast({
            message: '添加成功!',
            position: 'bottom',
            duration: 1500,
            onClose: () => {
              this.$router.go(-1)
            }
          })
        })
        .catch(err => {
          this.$pageLoading.hide()
          console.log(err)
          this.$toast(err.msg)
        })
    }
  },
  components: { headerBar, areaPopup }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgComUrl: '~@/assets/images/com/';

.add-address-page {
  // background: #ccc;

  .container {
    padding: 15px 15px 0;
  }
}

.bottom {
  font-size: 14px;
  color: #b1b2b7;
  padding: 16px 0;

  .icon {
    width: 18px;
    height: 18px;
    margin-right: 8px;

    &.icon-select {
      background: url('@{imgComUrl}icon-checked.png') no-repeat center / cover;
    }
    &.icon-no-select {
      background: url('@{imgComUrl}icon-no-checked.png') no-repeat center / cover;
    }
  }
}

.van-button--info {
  background: #5fc0a3;
  border: 1px solid #5fc0a3;
}

.van-form {
  /deep/ .van-cell {
    // background: #ccc;
    &.van-cell:nth-of-type(1) {
      border-radius: 10px 10px 0 0;
    }
    &.van-cell:nth-last-of-type(1) {
      border-radius: 0 0 10px 10px;
    }
  }
  .itemMobile {
    border-radius: 0 0 10px 10px;
  }
}
</style>
