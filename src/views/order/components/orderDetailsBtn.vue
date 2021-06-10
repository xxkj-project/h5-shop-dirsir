<!--
 * @Author: wangshengxian
 * @Date: 2020-11-12 16:57:47
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-08 11:12:35
 * @Desc: 订单详情页btn - components
-->
<template>
  <div class="orderdetails-btn-components">
    <!-- 待支付 -->
    <template v-if="itemData.orderStatus == 1">
      <van-button class="noBgBtn" round type="default" @click="onCancel">取消</van-button>
      <!-- <van-button class="bgBtn" round type="info" @click="onPay">支付</van-button> -->
    </template>

    <!-- 待发货 -->
    <template v-else-if="itemData.orderStatus == 2">
      <!-- TODO: 暂时没有申请退款，后面迭代添加 -->
      <!-- <van-button class="noBgBtn" type="default"round @click="onApplyRefund">申请退款</van-button> -->
    </template>

    <!-- 待收货 -->
    <template v-else-if="itemData.orderStatus == 3">
      <!-- <van-button class="noBgBtn" round type="default" @click="onCheckLogistics">查看物流</van-button> -->
      <!-- <van-button class="bgBtn" round type="info" @click="onConfirmReceive">确认收货</van-button> -->
    </template>

    <!-- 交易成功 -->
    <template v-else-if="itemData.orderStatus == 4">
      <!-- <van-button class="noBgBtn" type="default" hairline round @click="onCheckLogistics">查看物流</van-button> -->
    </template>

    <!-- 交易关闭 -->
    <template v-else-if="itemData.orderStatus == 5">
      <van-button class="noBgBtn" round type="default" @click="onDeleteOrder">删除订单</van-button>
    </template>

    <template v-else>
      <!-- 暂未有这方面需求，后续再迭代 -->
    </template>
  </div>
</template>

<script>
import storage from '@/utils/storage'
import api from '@/api/order'
export default {
  name: '',
  data() {
    return {
      titles: {
        cancel: '确认取消订单吗?',
        cancelPay: '确认取消支付吗?',
        receive: '确认收货吗?',
        delete: '确认删除订单吗?',
        refund: '是否申请退款？'
      },
      toast: {
        cancelTxt: '订单取消成功',
        deleteTxt: '订单删除成功',
        refundTxt: '申请退款成功',
        receiveTxt: '收货成功'
      }
    }
  },
  props: {
    itemData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {},
  created() {
    // 退款中/退款成功/退款失败
    // orderRefundStatus
    // 订单退款状态 (0,1,2,3,4,5,6)
    // 0 = 没有申请退款
    // 5 = 退款成功
    // 6 = 退款失败
    // 1，2，3，4 = 申请退款中
  },
  mounted() {},
  methods: {
    // 支付
    onPay() {
      this.$emit('success', 'pay')
    },
    // 申请退款, TODO: 暂时没有，需要后面迭代
    onApplyRefund() {
      this.$emit('success', 'refund')
    },
    // 查看物流，TODO: 暂时没有，需要后面迭代
    onCheckLogistics() {
      this.$emit('success', 'logistics')
    },
    // 取消订单
    onCancel() {
      this.dialogFunc(this.titles.cancel, () => {
        console.log('-cancel-item-', this.itemData)
        const params = { id: this.itemData.orderId }
        api.cancelOrder(params).then(res => {
          this.$toast(this.toast.cancelTxt)
          storage.setItem('cancelOrderId', this.itemData.orderId)
          this.$emit('success', 'cancel')
        })
      })
    },
    // 确认收货
    onConfirmReceive() {
      this.dialogFunc(this.titles.receive, () => {
        console.log('-confirm-', this.itemData)
        const params = { id: this.itemData.orderId }
        api.confirmReceipt(params).then(res => {
          storage.setItem('receiveOrderId', this.itemData.orderId)
          this.$toast({
            message: this.toast.receiveTxt,
            duration: 1500,
            position: 'bottom',
            onClose: () => {
              this.$emit('success', 'receive')
            }
          })
        })
      })
    },
    // 删除订单
    onDeleteOrder() {
      this.dialogFunc(this.titles.delete, () => {
        const params = { id: this.itemData.orderId }
        api.delOrderItem(params).then(res => {
          this.$toast(this.toast.deleteTxt)
          storage.setItem('deleteOrderId', this.itemData.orderId)
          this.$emit('success', 'delete')
        })
      })
    },
    dialogFunc(title, callback) {
      this.$dialog
        .confirm({
          title,
          cancelButtonText: '放弃',
          confirmButtonText: '确定'
        })
        .then(() => {
          callback()
        })
        .catch(() => {})
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.orderdetails-btn-components {
  // padding: 10px 15px 10px 0;
  .van-button {
    width: 100px;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    margin-left: 16px;

    &.noBgBtn {
      // color: #d2d4d9;
      // border: 1px solid #d2d4d9;
    }
    &.bgBtn {
      border: 1px solid #5fc0a3;
      background: #5fc0a3;
    }
  }
  /deep/ .van-button--default {
    color: #d2d4d9;
    // border: 1px solid orange;
    border: 1px solid #d2d4d9;
  }
}
</style>
