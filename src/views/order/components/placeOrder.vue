<!--
 * @Author: wangshengxian
 * @Date: 2020-11-13 10:50:14
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-21 18:40:37
 * @Desc: 支付弹出层
-->
<template>
  <div class="popup-components">
    <van-popup v-model="dialogVisible" position="bottom" get-container="#app" :close-on-click-overlay="false">
      <div class="payWay">
        <div class="top fx-column-space-between-center">
          <p class="title">支付金额</p>
          <p>
            <span class="price icon">{{ infoData.payment | price }}</span>
          </p>
          <van-icon @click="onClose" name="cross" />
        </div>
        <div class="bottom">
          <p class="descTxt">下单成功后，请您添加掌柜微信进行付款</p>
          <div class="paymentWrap">
            <ul class="listBox">
              <li class="item flexbox" v-for="(pay, index) in payList" :key="index" @click="onChecked(pay, index)">
                <p>掌柜微信号:</p>
                <div class="right fx-space-between-center flex1">
                  <p>{{ pay.account }}</p>
                  <span class="icon" :class="payActIdx === index ? 'icon-checked' : 'icon-no-checked'"></span>
                </div>
              </li>
            </ul>
          </div>

          <div class="btnBox">
            <van-button
              type="primary"
              size="small"
              :loading="isLoading"
              loading-type="spinner"
              loading-text="加载中..."
              @click="onConfirmOrder"
              >确认下单</van-button
            >
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import storage from '@/utils/storage'
import orderApi from '@/api/order'
import payApi from '@/api/pay'
export default {
  name: '',
  data() {
    return {
      isLoading: false,
      payActIdx: 0,
      payList: []
    }
  },
  props: {
    // popup状态，默认为确认订单页
    type: {
      type: String,
      default: 'confirmOrder'
    },
    visible: {
      type: Boolean,
      default: false
    },
    // 支付金额、收货地址id、商品sku
    infoData: {
      type: Object,
      default() {
        return {}
      }
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
  created() {
    this.getPayList()
  },
  mounted() {},
  methods: {
    onClose() {
      this.$dialog
        .confirm({
          title: '确认取消下单吗'
        })
        .then(() => {
          this.dialogVisible = false
        })
        .catch(() => {})
    },
    onChecked(item, index) {
      console.log(item, index)
      this.payActIdx = index
    },
    onConfirmOrder() {
      let payInfoObj = this.payList[this.payActIdx]
      console.log('-pay-info-obj-', payInfoObj)
      const { addresseeId, skus } = this.infoData
      const params = { addresseeId, skus, thirdId: payInfoObj.account }
      console.log('-params-', params)
      console.log('-type-', this.type)
      this.isLoading = true
      orderApi
        .orderSubmit(params)
        .then(res => {
          console.log('-res-', res)
          this.isLoading = false
          this.dialogVisible = false
          const { orderNo } = res.data
          // console.log('订单编号', orderNo)
          if (this.type === 'Cart') {
            const num = this.$store.state.cart.cartNum - skus.length
            console.log('-cart-num-', num)
            this.$store.dispatch('cart/getCartNum', num)
          }
          payInfoObj = { orderNo, ...payInfoObj }
          this.$router.replace({
            name: 'PayResult',
            query: { code: 200, payment: this.infoData.payment, payInfoObj: JSON.stringify(payInfoObj) }
          })
        })
        .catch(err => {
          this.isLoading = false
        })
    },
    // 获取支付微信号列表
    getPayList() {
      payApi.getPayList().then(res => {
        // console.log('-res-', res)
        const data = res.data
        this.payList = data
        console.log('-payList-', this.payList)
      })
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgComUrl: '~@/assets/images/com/';
.payWay {
  background: #f5f5f5;

  .top {
    position: relative;
    height: 90px;
    background: #fff;
    padding: 20px 15px;

    .title {
      font-size: 16px;
    }

    .price {
      font-size: 18px;
      font-weight: bold;
    }

    .van-icon {
      position: absolute;
      right: 15px;
      top: 15px;
      font-size: 20px;
      color: #cecdcd;
    }
  }
  .bottom {
    background-color: #fff;
    margin-top: 10px;
    .descTxt {
      font-weight: 700;
      font-size: 16px;
      line-height: 36px;
      padding: 16px 16px 0;
    }
    .paymentWrap {
      // height: 240px;
      // overflow-y: auto;
      padding: 16px 0;

      .listBox {
        .item {
          line-height: 30px;
          margin-bottom: 16px;
          padding: 0 16px;

          &:last-child {
            margin-bottom: 0;
          }

          .right {
            margin-left: 16px;
            .icon {
              width: 18px;
              height: 18px;

              &.icon-checked {
                background: url('@{imgComUrl}icon-checked.png') no-repeat center / cover;
              }
              &.icon-no-checked {
                background: url('@{imgComUrl}icon-no-checked.png') no-repeat center / cover;
              }
            }
          }
        }
      }
    }
    .btnBox {
      padding: 10px 15px 24px;

      .van-button {
        width: 100%;
        height: 40px;
        background-color: #5fc0a3;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
}
</style>
