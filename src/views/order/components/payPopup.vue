<!--
 * @Author: wangshengxian
 * @Date: 2020-11-13 10:50:14
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-26 16:19:32
 * @Desc: 支付弹出层
-->
<template>
  <div class="popup-components">
    <van-popup v-model="dialogVisible" position="bottom" get-container="#app" :close-on-click-overlay="false">
      <div class="payWay">
        <div class="payWayTop fx-column-space-between-center">
          <p class="title">支付金额</p>
          <p>
            <span class="price icon">{{ payment | price }}</span>
          </p>
          <van-icon @click="onClose" name="cross" />
        </div>
        <div class="payWayList">
          <ul>
            <li class="fx-space-between-center">
              <p class="fx-align-center">
                <img src="@/assets/images/order/pay_way1.png" alt="" />
                <span class="text">支付宝支付</span>
              </p>
            </li>
          </ul>

          <div class="btnBox">
            <p @click="onConfirmPay">确认支付</p>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import storage from '@/utils/storage'
export default {
  name: '',
  data() {
    return {}
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
    payment: {
      type: Number,
      required: true,
      default() {
        return 0
      }
    },
    orderId: {
      type: Number,
      required: true
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
  mounted() {},
  methods: {
    onClose() {
      this.$dialog
        .confirm({
          title: '确认取消支付吗'
        })
        .then(() => {
          this.dialogVisible = false
          if (this.type === 'order') return
          const routeName = this.$route.name
          // TODO: 去订单列表页
          this.$router.replace({
            name: 'Order',
            query: { status: 'TO_PAY', fromRouteName: routeName }
          })
        })
        .catch(() => {})
    },
    onConfirmPay() {
      Cookie.remove('back')
      // console.log('-order-id-', this.orderId)
      const mainOrder = this.$route.name === 'ConfirmOrder'
      const queryObj = { mainOrder, orderId: this.orderId }
      console.log('-queryobj-', queryObj)
      // TODO: 当前界面为确认订单页的话，使用replace跳转，否则使用push跳转
      if (mainOrder) {
        this.$router.replace({ name: 'PayJump', query: queryObj })
      } else {
        this.$router.push({ name: 'PayJump', query: queryObj })
      }
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.payWay {
  background: #f5f5f5;

  .payWayTop {
    position: relative;
    height: 90px;
    background: #fff;
    padding: 20px 15px;

    .title {
      font-size: 14px;
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
  .payWayList {
    background-color: #fff;
    margin-top: 10px;
    ul {
      padding: 7px 15px;
      li {
        padding: 12px 0px;
        img {
          height: 26px;
          width: 26px;
          margin-right: 10px;
        }
        .text {
          color: #333333;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
    .btnBox {
      padding: 10px 15px 24px;
      p {
        width: 100%;
        background-color: #5fc0a3;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        font-weight: 500;
        // background-color: #ffd100;
        // background-color: @primary;
      }
    }
  }
}
</style>
