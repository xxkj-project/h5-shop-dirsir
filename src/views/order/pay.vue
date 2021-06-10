<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 14:01:24
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-01 13:57:16
 * @Desc: 支付界面
-->
<template>
  <div class="pay-page">
    <headerBar />
    <div class="main">
      <div class="container fx-column-align-center">
        <div class="globalWrap top flexbox">
          <p>支付金额：</p>
          <p class="payment">{{ infoData.payment | price }}</p>
        </div>
        <div class="globalWrap center fx-align-center">
          <p class="labelName">
            支付微信号：
          </p>
          <div class="listBox">
            <van-dropdown-menu>
              <van-dropdown-item class="item" v-model="selPayVal" :options="payList"></van-dropdown-item>
            </van-dropdown-menu>
          </div>
        </div>
        <div class="bottom fx-center">
          <van-button type="info" @click="onSubmit">确认</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import api from '@/api/pay'
import orderApi from '@/api/order'
export default {
  name: '',
  data() {
    return {
      fromRouteName: '',
      infoData: {},
      payList: [],
      selPayVal: 0
    }
  },
  computed: {},
  created() {
    const { fromRouteName, pay } = this.$route.query
    this.fromRouteName = fromRouteName
    this.infoData = JSON.parse(pay)
    console.log('-pay-data-', this.infoData)
    this.getData()
  },
  mounted() {},
  methods: {
    // 开始下单
    onSubmit() {
      const { addresseeId, skus } = this.infoData
      // 如下 params.thirdId 为选中的微信账号
      const params = { addresseeId, skus, thirdId: this.selPayVal }
      console.log('-params-', params)
      this.$pageLoading.show('加载中...')
      console.log(this.fromRouteName)
      orderApi
        .orderSubmit(params)
        .then(res => {
          console.log('-res-', res)
          this.$pageLoading.hide()
          // this.isPayPopup = true
          // this.orderId = res.data.orderId
          // TODO: 订单id
          if (this.fromRouteName === 'Cart') {
            const num = this.$store.state.cart.cartNum - this.skus.length
            console.log('-cart-num-', num)
            this.$store.dispatch('cart/getCartNum', num)
          }
          this.$router.replace({
            name: 'PayResult',
            query: { code: 200 }
          })
        })
        .catch(err => {
          this.$pageLoading.hide()
        })
    },
    getData() {
      api.getPayList().then(res => {
        console.log('-res-', res)
        const data = res.data
        data.map((val, index) => {
          this.payList.push({ text: val.account, value: val.account, ...val })
        })
        this.selPayVal = this.payList[0].account
        console.log('-payList-', this.payList)
      })
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.pay-page {
  // height: 100%;
}

.main {
  height: 100%;
  // background: #ccc;
  padding: 15px 15px 15px;
  .container {
    background: #fff;
    border-radius: 6px;
  }
}
.top {
  font-size: 18px;
  line-height: 32px;
  padding: 20px 0 40px 0;
}

.bottom {
  width: 100%;
  padding: 60px 0 10px 0;
  .van-button {
    width: 160px;
    border-radius: 6px;
  }
}

.center {
  /deep/ .van-dropdown-menu__bar {
    padding: 0 30px;
  }
}
</style>
