<!--
 * @Author: wangshengxian
 * @Date: 2020-10-29 15:31:22
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-18 18:14:23
 * @Desc: 订单详情
-->
<template>
  <div class="order-details-page">
    <headerBar />

    <div class="main">
      <div class="topBg"></div>
      <div class="container">
        <div class="statusWrap fx-space-between-center">
          <p class="left fx-align-center">
            <span class="leftIcon" :class="'icon-order-status' + infoData.orderStatus"></span>{{ statusObj.leftTxt }}
          </p>
          <p>{{ statusObj.rightTxt }}</p>
        </div>

        <div class="global-module">
          <p class="moduleTitle">收货人信息</p>
          <div class="addressInfoWrap">
            <p class="top">
              <span class="userName">{{ infoData.addresseeName }}</span
              ><span>{{ infoData.addresseeMobile }}</span>
            </p>
            <p>{{ infoData.addresseeDetailAddress }}</p>
          </div>
        </div>

        <div class="global-module">
          <p class="moduleTitle fx-space-between">
            <span>商品信息</span> <span class="weChat" v-if="infoData.wechat">微信号：{{ infoData.wechat }}</span>
          </p>
          <div class="goodsInfoWrap">
            <div class="listBox">
              <div class="item">
                <div class="top flexbox">
                  <div class="imgBox fx-center">
                    <img :src="infoData.productImage" alt="" />
                  </div>
                  <div class="descBox fx-column-space-between flex1">
                    <div class="descTop">
                      <p class="title">{{ infoData.productTitle }}</p>
                      <p class="desc">{{ infoData.productSpec }}</p>
                    </div>
                    <div class="descBottom fx-space-between-center">
                      <span class="price">{{ infoData.price }}</span>
                      <div class="num">x {{ infoData.quantity }}</div>
                    </div>
                  </div>
                </div>
                <div class="bottom fx-space-between-center">
                  <p>快递运费</p>
                  <p>￥{{ infoData.freight }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="global-module">
          <p class="moduleTitle">订单信息</p>
          <div class="orderInfoWrap">
            <div class="infoBox">
              <p class="item" v-if="infoData.note">
                订单备注: <span>{{ infoData.note }}</span>
              </p>
              <div class="item orderNo fx-space-between-center">
                <p>
                  订单编号: <span>{{ infoData.orderNo }}</span>
                </p>
                <copyTxt :txt="infoData.orderNo" />
              </div>

              <p class="item">
                下单时间:
                <span>{{ infoData.orderTime }}</span>
              </p>

              <p class="item" v-if="infoData.paymentTime">
                支付时间:
                <span>{{ infoData.paymentTime }}</span>
              </p>

              <p class="item" v-if="infoData.deliveryTime">
                发货时间:
                <span>{{ infoData.deliveryTime }}</span>
              </p>

              <p class="item" v-if="infoData.confirmReceivingTime">
                收货时间:
                <span>{{ infoData.confirmReceivingTime }}</span>
              </p>

              <p class="item" v-if="infoData.cancelTime">
                取消订单时间:
                <span>{{ infoData.cancelTime }}</span>
              </p>

              <p class="item" v-if="infoData.refundTime">
                退款时间:
                <span>{{ infoData.refundTime }}</span>
              </p>

              <p class="item" v-if="infoData.refundOrderNo">
                退款单号:
                <span>{{ infoData.refundOrderNo }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footerWrap fx-flex-end-center" v-if="isShowFooter">
      <footerBtn :itemData="infoData" @success="handleSuccess" />
    </div>

    <pay-popup :type="popupType" :visible.sync="isPayPopup" :payment="infoData.payment" :orderId="orderId" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import copyTxt from '@/components/copyTxt'
import footerBtn from './components/orderDetailsBtn'
import payPopup from './components/payPopup'
// import { orderEnum } from '@/utils/globalConst'
import api from '@/api/order'
import tools from '@/utils/tools'
// const statusTxtObj = { 1: '待付款', 2: '待发货', 3: '待收货', 4: '交易完成', 5: '交易关闭' }
export default {
  name: '',
  data() {
    return {
      popupType: '',
      orderId: 0,
      isPayPopup: false,
      statusObj: {
        iconClass: '',
        leftTxt: '',
        rightTxt: ''
      },
      infoData: {}
    }
  },
  computed: {
    isShowFooter() {
      const isFoot = this.infoData.orderStatus == 2 || this.infoData.orderStatus == 4 || this.infoData.orderStatus == 3
      return !isFoot
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.orderId = +id
    this.popupType = type
    this.getData()
  },
  mounted() {},
  methods: {
    handleSuccess(data) {
      console.log('-type-', data)
      switch (data) {
        case 'cancel':
          console.log('-cancel-order-')
          this.$router.go(-1)
          break
        case 'pay':
          console.log('-pay-order-')
          this.isPayPopup = true
          break
        case 'receive':
          console.log('-receive-order-')
          this.$router.go(-1)
          break
        case 'delete':
          console.log('-delete-order-')
          this.$router.go(-1)
          break
        case 'logistics':
          console.log('-查看物流-checked-logistics-')
          // TODO: 前往物流界面，暂时不用做，后面看需求
          break
        case 'refund':
          console.log('-退款订单-refund-order-')
          // TODO: 申请退款，前往退款界面，暂时不做，后面迭代
          break
        default:
          break
      }
    },
    handlePay() {
      console.log('-订单详情-付款成功回调-')
    },
    // 待付款状态文本 (5小时候订单关闭)
    setPaymentStatusObj(orderTime) {
      let startTime = new Date().getTime()
      let endTime = tools.getTimestamp(orderTime) + 60 * 60 * 5 * 1000
      let ct = Math.floor((endTime - startTime) / 1000 / 60)
      console.log('-cha-', ct)
      return { leftTxt: '待付款', rightTxt: `剩余${ct}分钟自动关闭` }
    },
    // 其它状态文本
    setOtherStatusObj(status) {
      let leftTxt, rightTxt
      switch (status) {
        case 2:
          leftTxt = '待发货'
          rightTxt = '等待卖家发货'
          break
        case 3:
          leftTxt = '待收货'
          rightTxt = '等待买家收货'
          break
        case 4:
          leftTxt = '交易完成'
          rightTxt = ''
          break
        case 5:
          leftTxt = '交易关闭'
          rightTxt = ''
          break
      }

      return { leftTxt, rightTxt }
    },
    getData() {
      this.$loading.show()
      const params = { id: this.orderId }
      api
        .getOrderDetails(params)
        .then(res => {
          this.$loading.hide()
          // console.log('-res-', res)
          this.infoData = res.data
          console.log('-info-data-', this.infoData)
          if (this.infoData.orderStatus == 1) {
            this.statusObj = this.setPaymentStatusObj(this.infoData.orderTime)
          } else {
            this.statusObj = this.setOtherStatusObj(this.infoData.orderStatus)
          }
          // console.log(this.statusObj)
        })
        .catch(err => {
          this.$loading.hide()
        })
    }
  },
  components: { headerBar, copyTxt, footerBtn, payPopup }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/order/';
.order-details-page {
  background: #f9fafc;
}

.main {
  position: relative;

  .topBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 256px;
    background: url('@{imgUrl}orderTopBg.png') no-repeat center / cover;
  }

  .container {
    position: relative;
    padding: 0 15px 180px;
  }
}

.global-module {
  background: #fff;
  padding: 0 15px;
  margin-bottom: 15px;
  border-radius: 10px;

  .moduleTitle {
    font-size: 16px;
    line-height: 54px;
    font-weight: 700;
    border-bottom: 1px solid #efeff1;
    // border-bottom: 1px solid red;

    .weChat {
      font-weight: 500;
    }
  }
}

.statusWrap {
  color: #fff;
  padding: 16px 0;

  .left {
    font-size: 18px;
    line-height: 24px;

    .leftIcon {
      width: 18px;
      height: 18px;
      margin-right: 8px;

      &.icon-order-status1 {
        background: url('@{imgUrl}icon-order-status1.png') no-repeat center / cover;
      }
      &.icon-order-status2 {
        background: url('@{imgUrl}icon-order-status2.png') no-repeat center / cover;
      }
      &.icon-order-status3 {
        background: url('@{imgUrl}icon-order-status3.png') no-repeat center / cover;
      }
      &.icon-order-status4 {
        background: url('@{imgUrl}icon-order-status4.png') no-repeat center / cover;
      }
      &.icon-order-status5 {
        background: url('@{imgUrl}icon-order-status5.png') no-repeat center / cover;
      }
    }
  }
}

.addressInfoWrap {
  color: #b1b2b7;
  line-height: 22px;
  padding: 16px 0;

  .top {
    margin-bottom: 8px;

    .userName {
      margin-right: 16px;
    }
  }
}

.goodsInfoWrap {
  .listBox {
    .item {
      background: #fff;
      margin-bottom: 16px;

      .top {
        padding: 16px 0;

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

          .descTop {
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

          .descBottom {
            width: 100%;

            .price {
              font-size: 18px;
              line-height: 26px;
            }

            .num {
              color: #b1b2b7;
            }
          }
        }
      }

      .bottom {
        padding: 16px 0;
      }
    }
  }
}

.orderInfoWrap {
  .infoBox {
    line-height: 28px;
    font-size: 14px;
    color: #b1b2b7;
    padding: 12px 0;
  }

  .item {
    span {
      margin-left: 10px;
    }

    .copyBtn {
      color: #5fc0a3;
    }
  }
}

.footerWrap {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  padding: 10px 15px 10px 0;
}
</style>
