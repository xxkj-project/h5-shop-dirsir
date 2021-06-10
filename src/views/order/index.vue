<!--
 * @Author: wangshengxian
 * @Date: 2020-10-28 14:10:27
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-18 18:17:58
 * @Desc: order - 订单页
-->
<template>
  <div class="order-page">
    <headerBar :onBack="handleBack" />
    <div class="main">
      <van-tabs
        v-model="actType"
        color="#5FC0A3"
        title-active-color="#5FC0A3"
        title-inactive-color="#B1B2B7"
        line-height="4px"
        sticky
        :offset-top="offsetTop"
        @click="onTabs"
      >
        <van-tab :title="item.title" :name="item.orderStatus" v-for="(item, index) in tabNavList" :key="index">
          <div class="listWrap">
            <template v-if="isShowList">
              <van-list
                class="listbox"
                v-model="isMoreLoading"
                :immediate-check="false"
                :finished="isMoreFinished"
                finished-text="没有更多了"
                :error.sync="isMoreError"
                error-text="加载失败，点击重新加载"
                @load="getData"
              >
                <div class="item" v-for="(item, index) in list" :key="index">
                  <div class="top fx-space-between-center">
                    <p class="orderNum">{{ item.orderNo }}</p>
                    <p class="orderStatus" :class="item.orderStatus | formatOrderStatusClass">
                      {{ item.orderStatus | formatOrderStatusTxt }}
                    </p>
                  </div>
                  <div class="center flexbox" @click="onJumpPage(item)">
                    <div class="imgBox fx-center">
                      <img v-lazy="item.productImage" alt="" />
                    </div>

                    <div class="descBox fx-column-space-between flex1">
                      <div class="descTop">
                        <p class="title">{{ item.productTitle }}</p>
                        <p class="desc">{{ item.productSpec }}</p>
                      </div>
                      <div class="descBottom fx-space-between-center">
                        <span class="price">{{ item.price | price }}</span>
                        <div class="num">x {{ item.quantity }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="bottom fx-space-between-center">
                    <p class="price">合计：{{ item.paymentPrice | price }}</p>
                    <div class="btnBox">
                      <order-btn :itemData="item" @success="handleBtnSuccess" />
                    </div>
                  </div>
                </div>
              </van-list>
            </template>
            <template v-else>
              <no-data />
            </template>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <pay-popup type="order" :visible.sync="isPayPopup" :payment="selData.paymentPrice" :orderId="orderId" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import orderBtn from './components/orderBtn'
import noData from '@/components/noData'
import payPopup from './components/payPopup'
import { mapState } from 'vuex'
import { orderEnum } from '@/utils/globalConst'
import api from '@/api/order'
import jsPrecision from '@/utils/jsPrecision'
import Cookie from 'js-cookie'
import storage from '@/utils/storage'

// status = 1待付款; 2待发货; 3已发货; 4 交易完成；5交易关闭
function getOrderTxt(status) {
  let result = ''
  switch (status) {
    case 1:
      result = '待付款'
      break
    case 2:
      result = '待发货'
      break
    case 3:
      result = '已发货'
      break
    case 4:
      result = '交易完成'
      break
    case 5:
      result = '交易关闭'
      break
    default:
      break
  }
  return result
}

export default {
  name: '',
  data() {
    return {
      isPopState: false,
      fromRouteName: '',
      isFirst: true,
      isPayPopup: false,
      remBase: '41.4',
      actType: '',
      tabNavList: [
        { title: '全部', orderStatus: orderEnum.ALL },
        { title: '待付款', orderStatus: orderEnum.TO_PAY },
        { title: '待发货', orderStatus: orderEnum.TO_SEND }
        // { title: '已完成', orderStatus: orderEnum.TO_RECEIVE },
      ],
      pageNum: 1,
      pageSize: 10,
      isMoreLoading: false,
      isMoreFinished: false,
      isMoreError: false,
      list: [],
      orderId: 0,
      selData: {}
    }
  },
  computed: {
    ...mapState('app', ['statusBarHeight']),
    // 粘性布局 offsetTop 获取需要转换成rem在真机上面才能正常显示，px显示适配有问题
    offsetTop() {
      // console.log(this.statusBarHeight)
      // 54 为headerBar标题的高度
      let result = +this.statusBarHeight + 54
      return result / this.remBase + 'rem'
    },
    isShowList() {
      return this.list.length > 0
    }
  },
  filters: {
    formatOrderStatusClass(val) {
      // TODO: 订单状态需要后面调试接口的时候再行确定
      // val = 1待付款; 2待发货; 3已发货; 4 交易完成；5交易关闭
      let result = val == 1 ? 'awaitPay' : val == 2 ? 'awaitDeliver' : 'defaultStatus'
      return result
    },
    formatOrderStatusTxt(val) {
      return getOrderTxt(val)
    }
  },
  watch: {},
  created() {
    this.setInitActType()
    this.getData(true)
    // window.addEventListener('popstate', this.goBack, false)
  },
  mounted() {
    // TODO: 再次购买，下单成功后查看订单页，回退要退两次才能回到我的页面，解决方法，可以使用一个type，标识是否为再次购买回到的订单页，是的话，后退两步 this.$router.go(-2),否则go(-1),headerBar返回键默认为go(-1),只有设置了用来控制返回的步数的参数，才生效
    // 这样就可以不改代码进行迭代。
    // TODO: 通过设备物理键返回，在再次购买的状态下，需要回退两步的bug还在
  },
  destroyed() {
    // window.removeEventListener('popstate', this.goBack)
  },
  beforeRouteEnter(to, from, next) {
    if (from.path != '/payResult' && storage.getItem('_is_buy_again')) {
      storage.removeItem('_is_buy_again')
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    if (to.path != '/orderDetails' && storage.getItem('order_activeidx')) {
      storage.removeItem('order_activeidx')
    }
    next()
  },
  methods: {
    // 设置初始化actType
    setInitActType() {
      console.log('-query-', this.$route.query)
      const { status, fromRouteName } = this.$route.query
      this.fromRouteName = fromRouteName
      const actIdx = storage.getItem('order_activeidx')
      this.actType = actIdx || status
    },
    handleBack() {
      console.log('-是否再次购买-', storage.getItem('_is_buy_again'))
      let backStep = storage.getItem('_is_buy_again') ? -2 : -1
      console.log('-后退步数-', backStep)
      this.$router.go(backStep)
    },
    goBack() {
      // let _this = this
      // console.log('-this-', _this.isPopState)
      // console.log('监听浏览器的返回事件')
      // if (this.fromRouteName === 'PayResult' && storage.getItem('_is_buy_again')) {
      //   this.$router.go(-2)
      // }
    },
    handleBtnSuccess(data) {
      console.log('-btn-success-', data)
      const type = data[0]
      const item = data[1]
      switch (type) {
        case 'cancel':
          this.cancelSuccess(item)
          break
        case 'delete':
          this.list = this.list.filter(val => val.orderId !== item.orderId)
          break
        case 'receive':
          this.getData()
          break
        case 'pay':
          console.log('-pay-', item)
          this.selData = item
          this.orderId = item.orderId
          this.isPayPopup = true
          break
        default:
          break
      }
    },
    cancelSuccess(item) {
      if (this.actType === 'TO_PAY') {
        this.list = this.list.filter(val => val.orderId !== item.orderId)
      } else {
        item.orderStatus = 5
      }
    },
    setScrollTop() {
      let el = document.querySelector('.listWrap')
      console.log('-el-', el, el.scrollTop)
    },
    onTabs(name, title) {
      // this.setScrollTop()
      console.log(this.actType)
      storage.setItem('order_activeidx', this.actType)
      this.pageNum = 1
      this.isMoreFinished = false
      this.isMoreError = false
      this.getData(true)
    },
    onJumpPage(item) {
      console.log('-item-', item)
      this.$router.push({ path: '/orderDetails', query: { id: item.orderId, type: 'order' } })
    },
    getData(isInit) {
      const orderStatus = this.actType || 'All'
      const params = { orderStatus, pageNum: this.pageNum, pageSize: this.pageSize }
      console.log('-params-', params)
      this.isMoreLoading = true
      isInit ? this.getInitData(params) : this.getMoreData(params)
    },
    // 初始化数据
    getInitData(params) {
      this.isFirst ? this.$loading.show() : this.$pageLoading.show('加载中...')
      api
        .getOrderItem(params)
        .then(res => {
          this.isFirst ? this.$loading.hide() : this.$pageLoading.hide()
          this.isMoreLoading = false
          this.isFirst = false
          // console.log('-res-', res)
          const { list, count } = res.data
          this.list = this.setPaymentPrice(list)
          this.pageNum++
          if (this.list.length >= count) {
            console.log('-init-全部加载完成')
            this.isMoreFinished = true
          }
        })
        .catch(err => {
          console.log('-init-err-', err)
          this.isFirst ? this.$loading.hide() : this.$pageLoading.hide()
          this.isMoreError = true
        })
    },
    // 查看更多
    getMoreData(params) {
      // console.log('查看更多')
      api
        .getOrderItem(params)
        .then(res => {
          this.isMoreLoading = false
          // console.log('-res-', res)
          const { list, count } = res.data
          this.list = [...this.list, ...this.setPaymentPrice(list)]
          this.pageNum++
          if (this.list.length >= count) {
            console.log('-more-全部加载完成')
            this.isMoreFinished = true
          }
          console.log('-more-list-', this.list)
        })
        .catch(err => {
          console.log('-more-err-', err)
          this.isMoreError = true
        })
    },

    // 设置单个购物车项总的price
    setPaymentPrice(list) {
      let result = []
      list.map(val => {
        let mid = {}
        mid = { paymentPrice: jsPrecision.mul(val.price, val.quantity), ...val }
        result.push(mid)
      })
      return result
    }
  },
  components: { headerBar, orderBtn, noData, payPopup }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.order-page {
  background: #f9fafc;
  // background: #ccc;

  /deep/ .van-tab {
    font-size: 16px;
  }
}

.listWrap {
  padding: 15px 15px 0;

  .listBox {
    padding: 15px 15px;
  }
}

.item {
  background: #fff;
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 0 15px;

  .top {
    line-height: 50px;
    border-bottom: 1px solid #efeff1;

    .orderNum {
      font-size: 14px;
      color: #b1b2b7;
    }

    .orderStatus {
      &.awaitPay {
        color: #ffcc7e;
      }
    }
  }

  .center {
    padding: 16px 0;

    .imgBox {
      overflow: hidden;
      width: 124px;
      height: 124px;
      // background: #f6f5f3;
      background: #fff;
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
          // color: #5fc0a3;
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
</style>
