<!--
 * @Author: wangshengxian
 * @Date: 2020-10-28 14:20:24
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-24 16:03:15
 * @Desc: 确认订单页 - page
-->
<template>
  <div class="confirm-order-page">
    <headerBar />
    <div class="main">
      <template v-if="isSellOut">
        <div class="noData fx-column-align-center">
          <p class="txt">商品下架了</p>
          <van-button type="primary" plain size="normal" @click="onJumpHome">去逛逛</van-button>
        </div>
      </template>
      <template v-else>
        <div class="container">
          <template v-if="isHaveAddress">
            <div class="globalModule">
              <p class="moduleTitle">收货人信息</p>
              <div class="addressWrap" @click="onPageJump">
                <div class="addressItem fx-space-between-center">
                  <p class="fx-center">
                    <span>{{ addressData.name }}</span>
                    <span class="mobile">{{ addressData.mobile }}</span>
                  </p>
                  <span class="icon-right-arrow"></span>
                </div>
                <div class="addressItem">
                  <p>{{ addressData.addressTxt }}</p>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="globalModule">
              <div class="noAddressWrap fx-column-center" @click="onPageJump">
                <span class="icon-address"></span>
                <div class="fx-center">
                  <span class="icon-address-add"></span>
                  <p class="txt">需要添加收货地址</p>
                </div>
              </div>
            </div>
          </template>

          <div class="globalModule">
            <p class="moduleTitle">商品信息</p>
            <div class="infoWrap">
              <ul class="listBox">
                <li class="item fx-column" v-for="(item, index) in list" :key="index">
                  <div class="itemTop flexbox">
                    <div class="imgBox fx-center">
                      <img v-lazy="item.productImage" alt="" />
                    </div>

                    <div class="descBox fx-column-space-between flex1">
                      <div class="top">
                        <p class="title">{{ item.productTitle }}</p>
                        <p class="desc">{{ item.specName }}</p>
                      </div>
                      <div class="bottom fx-space-between-center">
                        <span class="price">{{ item.unitPrice | price }}</span>
                        <div class="num">x {{ item.purchaseQuantity }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="itemBottom">
                    <div class="remarkBox">
                      <van-field
                        v-model="skus[index].remark"
                        clearable
                        label="备注"
                        placeholder="请填写备注信息"
                      ></van-field>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="otherBox">
                <div class="otherItem fx-space-between-center">
                  <p>快递运费</p>
                  <p>{{ infoData.freightFee | price }}</p>
                </div>
                <div class="otherItem fx-space-between-center">
                  <p>优惠折扣</p>
                  <p>{{ infoData.discountsVal | filterDisCounts }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footerWrap">
          <div class="footerContent fx-flex-end-center">
            <div class="left fx-align-end">
              <p>合计:</p>
              <p class="price">{{ infoData.totalPrice | price }}</p>
            </div>
            <div class="right">
              <van-button type="info" round :disabled="isReqError" @click="onSubmit">提交订单</van-button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- <pay-popup :visible.sync="isPayPopup" :payment="infoData.totalPrice" :orderId="orderId" /> -->
    <placeOrder :type="fromRouteName" :visible.sync="isPayPopup" :infoData="placeOrderData" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import placeOrder from './components/placeOrder'
// import payPopup from './components/payPopup'
import storage from '@/utils/storage'
import Cookie from 'js-cookie'
import api from '@/api/order'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      isReqError: false,
      isSellOut: false, // 商品是否下架，默认false
      fromRouteName: '',
      selPayType: 'alipay',
      skus: null,
      addressData: null,
      infoData: {
        totalPrice: 0,
        freightFee: 0,
        discountsVal: 0,
        remarkVal: '这是备注' // 备注
      },
      list: [],
      isPayPopup: false,
      placeOrderData: {},
      orderId: 0
    }
  },
  computed: {
    isHaveAddress() {
      return !!this.addressData
    },
    isCartFrom() {
      console.log(this.$route.query)
      return true
    },
    ...mapState('user', ['code'])
  },
  filters: {
    filterDisCounts(val) {
      return !val ? '暂无优惠' : `$${val}`
    }
  },
  components: { headerBar, placeOrder },
  created() {
    const { skus, fromRouteName } = this.$route.query
    fromRouteName && (this.fromRouteName = fromRouteName)
    this.skus = JSON.parse(skus)
    console.log('-confirm-order-sku-data-', this.skus)
    // 多见商品购买每一件商品都有一个备注
    this.getData()
  },
  mounted() {
    console.log(process.env.VUE_APP_SERVER_URL)
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== '/address') {
      storage.removeItem('confirm_address')
    }
    next()
  },
  methods: {
    onJumpHome() {
      this.$router.push({ path: `/index/${this.code}` })
    },
    onPageJump() {
      this.$router.push({ path: '/address', query: { type: 'confirmOrder' } })
    },
    // 新版支付
    onSubmit() {
      // console.log(this.selPayType)
      if (!this.addressData) {
        this.$toast('请填写完整收货地址!')
        return
      }
      const payObj = { payment: this.infoData.totalPrice, addresseeId: this.addressData.id, skus: this.skus }
      console.log('-支付参数-', payObj)
      this.isPayPopup = true
      this.placeOrderData = payObj
    },
    // 支付宝支付（支付账号暂时没有审核通过，该功能暂未接，已经调试过了）
    onSubmits() {
      // console.log('-提交订单-', this.selPayType)
      if (!this.addressData) {
        this.$toast('请填写完整收货地址!')
        return
      }
      const params = { addresseeId: this.addressData.id, skus: this.skus }
      console.log('-params-', params)
      this.$pageLoading.show('加载中...')
      console.log(this.fromRouteName)
      api
        .orderSubmit(params)
        .then(res => {
          console.log('-res-', res)
          this.$pageLoading.hide()
          this.isPayPopup = true
          this.orderId = res.data.orderId
          if (this.fromRouteName === 'Cart') {
            const num = this.$store.state.cart.cartNum - this.skus.length
            console.log('-cart-num-', num)
            this.$store.dispatch('cart/getCartNum', num)
          }
        })
        .catch(err => {
          this.$pageLoading.hide()
        })
    },
    // 获取确认订单页
    getData() {
      this.$loading.show()
      const params = { skus: this.skus }
      console.log('-params-', params)
      api
        .orderSettlement(params)
        .then(res => {
          this.$loading.hide()
          console.log('-res-', res)
          // deliveryAddressResponseVO = 收货地址信息
          // settlementShopItems = 商品信息
          const { deliveryAddressResponseVO, settlementShopItems } = res.data
          if (settlementShopItems.length === 0) {
            // 商品下架了，或者sku修改了
            this.isSellOut = true
            return
          }
          this.isSellOut = false
          // favourFee = 优惠折扣；freightFee = 运费；skuItems = 商品信息
          const { favourFee, freightFee, skuItems, payment } = settlementShopItems[0]
          console.log('-商品信息-', settlementShopItems[0])
          this.infoData.freightFee = freightFee
          // this.infoData.discountsVal = '0'
          this.infoData.discountsVal = favourFee
          this.infoData.totalPrice = payment
          this.list = skuItems
          console.log('-list-', this.list)
          this.setAddressData(deliveryAddressResponseVO)
        })
        .catch(err => {
          console.log('-err-', err)
          this.$loading.hide()
          this.isReqError = true
        })
    },
    // 设置收货地址信息
    setAddressData(data) {
      console.log('-收货地址信息-', data)
      const storageAddress = storage.getItem('confirm_address')
      console.log('-storage-address-', storageAddress)
      if (storageAddress) {
        this.addressData = storageAddress
      } else {
        if (!data.id) return
        this.addressData = data
        this.addressData.addressTxt = `${data.province}${data.city}${data.detailAddress}`
      }
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/order/';
@imgComUrl: '~@/assets/images/com/';
.confirm-order-page {
  background: #f9fafc;
  .main {
    .container {
      padding: 15px 15px 10px;
    }

    .globalModule {
      background: #fff;
      // background: rgb(233, 230, 230);
      border-radius: 10px;
      padding: 0 15px;
      margin-bottom: 15px;
      .moduleTitle {
        font-size: 16px;
        font-weight: 700;
        line-height: 54px;
        border-bottom: 1px solid #efeff1;
      }
    }
  }
}

.noData {
  font-size: 18px;
  padding-top: 90px;

  .txt {
    padding-bottom: 50px;
  }

  /deep/ .van-button {
    height: 36px;
    line-height: 36px;
    color: #5fc0a3;
    border: 1px solid #5fc0a3;
  }
}

.addressWrap {
  padding: 8px 0;
  .addressItem {
    line-height: 28px;
    color: #b1b2b7;

    .mobile {
      margin-left: 16px;
    }

    .icon-right-arrow {
      width: 7px;
      height: 12px;
      background: url('@{imgComUrl}icon-right-arrow.png') no-repeat center / cover;
    }
  }
}

.noAddressWrap {
  padding: 16px 0;
  .icon-address {
    width: 68px;
    height: 68px;
    background: url('@{imgUrl}icon-address.png') no-repeat center / cover;
    margin-bottom: 14px;
  }
  .icon-address-add {
    width: 18px;
    height: 18px;
    background: url('@{imgUrl}icon-address-add.png') no-repeat center / cover;
    margin-right: 8px;
  }
  .txt {
    color: #d2d4d9;
    line-height: 20px;
  }
}

.infoWrap {
  .item {
    padding-top: 16px;

    .itemTop {
      .imgBox {
        overflow: hidden;
        width: 124px;
        height: 124px;
        background: #f6f5f3;
        border-radius: 8px;
        margin-right: 15px;
        img {
          display: block;
          max-width: 124px;
          max-height: 124px;
        }
      }
      .descBox {
        padding-bottom: 8px;
        .top {
          .title {
            font-size: 15px;
            line-height: 21px;
            margin-bottom: 12px;
          }
          .desc {
            color: #d2d4d9;
            font-size: 12px;
          }
        }

        .bottom {
          width: 100%;
          .price {
            color: #5fc0a3;
            font-size: 18px;
            line-height: 26px;
          }
          .num {
            color: #b1b2b7;
          }
        }
      }
    }
    .itemBottom {
      .remarkBox {
        /deep/ .van-cell {
          line-height: 36px;
          padding: 10px 0;
          .van-field__label {
            width: 50px;
            font-size: 16px;
          }
          .van-field__control {
            border: 1px solid rgb(233, 232, 232);
            border-radius: 6px;
            padding-left: 8px;
          }
        }
      }
    }
  }

  .otherBox {
    padding-bottom: 8px;
    // padding: 16px 0 8px 0;
    .otherItem {
      line-height: 36px;
    }
  }
}

.footerWrap {
  height: 60px;
}

.footerContent {
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 60px;
  background: #fff;
  padding: 8px 15px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

  .left {
    color: #5fc0a3;
    font-size: 18px;
    line-height: 20px;

    .price {
      font-size: 16px;
      line-height: 16px;
      padding-left: 10px;
    }
  }
  .right {
    .van-button {
      width: 100px;
      margin-left: 16px;
    }
    /deep/ .van-button--info {
      background-color: #5fc0a3;
      border: 1px solid#5FC0A3;
    }
  }
}
</style>
