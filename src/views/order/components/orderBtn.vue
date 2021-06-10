<!--
 * @Author: wangshengxian
 * @Date: 2020-11-12 16:57:47
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-14 10:25:25
 * @Desc: 订单页btn - components
-->
<template>
  <div class="order-btn-components">
    <!-- orderRefundStatus = 退款状态 -->
    <template v-if="itemData.orderRefundStatus == 0">
      <!-- 待支付 -->
      <template v-if="itemData.orderStatus == 1">
        <van-button class="cancelBtn" plain round type="default" size="mini" @click="onCancel">取消</van-button>
        <!-- <van-button class="buyBtn" plain round type="info" size="mini" @click="onPay">支付</van-button> -->
      </template>

      <!-- 待发货 -->
      <template v-else-if="itemData.orderStatus == 2">
        <!-- TODO: 暂时没有申请退款，后面迭代添加 -->
        <!-- <p>等待卖家发货---没有按钮</p> -->
      </template>

      <!-- 待收货 -->
      <template v-else-if="itemData.orderStatus == 3">
        <!-- 暂时没有 -->
        <!-- <van-button class="cancelBtn" plain round type="default" size="mini" @click="onCheckLogistics"
          >查看物流</van-button
        > -->
        <!-- <van-button class="buyBtn" plain round type="info" size="mini" @click="onConfirmReceive">确认收货</van-button> -->
      </template>

      <!-- 交易成功 -->
      <template v-else-if="itemData.orderStatus == 4">
        <!-- TODO: 暂时没有 -->
        <!-- <van-button class="btn cancelBtn" type="default" size="mini" plain round @click="onCheckLogistics"
          >查看物流</van-button
        > -->
      </template>

      <!-- 交易关闭 -->
      <template v-else-if="itemData.orderStatus == 5">
        <van-button class="cancelBtn" plain round type="default" size="mini" @click="onDeleteOrder"
          >删除订单</van-button
        >
        <van-button class="buyBtn" plain round type="info" size="mini" @click="onBuyAgain">再次购买</van-button>
      </template>
    </template>

    <!-- 退款中/退款成功 -->
    <template v-else>
      <van-button class="cancelBtn" plain round type="default" size="mini" @click="onCheckLogistics"
        >查看物流</van-button
      >
    </template>
  </div>
</template>

<script>
import storage from '@/utils/storage'
import orderApi from '@/api/order'
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
    // 取消订单
    onCancel() {
      this.dialogFunc(this.titles.cancel, () => {
        console.log('-cancel-item-', this.itemData)
        const params = { id: this.itemData.orderId }
        orderApi.cancelOrder(params).then(res => {
          this.$toast(this.toast.cancelTxt)
          storage.setItem('cancelOrderId', this.itemData.orderId)
          this.$emit('success', ['cancel', this.itemData])
        })
      })
    },
    // 支付
    onPay() {
      console.log('-pay-', this.itemData)
      this.$emit('success', ['pay', this.itemData])
      // Cookie.remove('back')
      // console.log('-order-id-', this.orderId)
      // const queryObj = { mainOrder: true, orderId: this.orderId }
      // this.$router.push({ name: 'PayJump', query: queryObj })
    },
    // 查看物流
    onCheckLogistics() {
      // TODO: 暂时没有，需要后面迭代
      console.log('查看物流')
    },
    // 确认收货
    onConfirmReceive() {
      this.dialogFunc(this.titles.receive, () => {
        console.log('-confirm-', this.itemData)
        const params = { id: this.itemData.orderId }
        orderApi.confirmReceipt(params).then(res => {
          storage.setItem('receiveOrderId', this.itemData.orderId)
          this.$toast({
            message: this.toast.receiveTxt,
            duration: 1500,
            position: 'bottom',
            onClose: () => {
              this.$emit('success', ['receive', this.itemData])
            }
          })
        })
      })
    },
    // 删除订单
    onDeleteOrder() {
      this.dialogFunc(this.titles.delete, () => {
        // console.log('-delete-order-', this.itemData)
        const params = { id: this.itemData.orderId }
        orderApi.delOrderItem(params).then(res => {
          this.$toast(this.toast.deleteTxt)
          storage.setItem('deleteOrderId', this.itemData.orderId)
          this.$emit('success', ['delete', this.itemData])
        })
      })
    },
    //再次购买
    onBuyAgain() {
      console.log('-buy-again-', this.itemData)
      // 再次购买标识存储
      storage.setItem('_is_buy_again', true)
      const arr = [
        {
          cartItemId: 0,
          quantity: this.itemData.quantity,
          remark: '',
          skuId: this.itemData.skuId
        }
      ]
      this.$router.push({
        path: '/confirmOrder',
        query: { skus: JSON.stringify(arr) }
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
/deep/ .van-button {
  width: 78px;
  margin-left: 16px;

  &.van-button--mini {
    line-height: 24px;
    font-size: 14px;
  }
  &.van-button--default {
    color: #d2d4d9;
    border: 1px solid #d2d4d9;
  }
  &.van-button--info {
    border: 1px solid #5fc0a3;
    color: #5fc0a3;
  }
}
</style>
