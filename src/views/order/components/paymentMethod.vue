<!--
 * @Author: wangshengxian
 * @Date: 2020-12-02 18:16:58
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-03 09:49:12
 * @Desc: 支付方式 - components
-->
<template>
  <div class="payment-method-components">
    <ul class="paymentWrap">
      <li class="item flexbox" v-for="(pay, index) in paymentList" :key="index" @click="onChecked(pay, index)">
        <span class="icon-pay" :class="'icon' + '-' + pay.type"></span>
        <div class="right fx-space-between-center flex1">
          <p>{{ pay.name }}</p>
          <span class="icon" :class="payActIdx === index ? 'icon-checked' : 'icon-no-checked'"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      payActIdx: 0,
      paymentList: [
        { type: 'alipay', name: '支付宝' },
        { type: 'wx', name: '微信' },
        { type: 'bank', name: '银联' }
      ]
    }
  },
  props: {
    payType: {
      type: String,
      default: 'alipay'
    }
  },
  computed: {
    selPayType: {
      get() {
        return this.payType
      },
      set(val) {
        // console.log('-val-', val)
        this.$emit('update:payType', val)
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    onChecked(item, idx) {
      this.payActIdx = idx
      this.selPayType = item.type
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/order/';
@imgComUrl: '~@/assets/images/com/';
.paymentWrap {
  padding: 16px 0;
  .item {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    .icon-pay {
      width: 30px;
      height: 30px;

      &.icon-alipay {
        background: url('@{imgUrl}icon-alipay.png') no-repeat center / cover;
      }
      &.icon-wx {
        background: url('@{imgUrl}icon-wx.png') no-repeat center / cover;
      }
      &.icon-bank {
        background: url('@{imgUrl}icon-bank.png') no-repeat center / cover;
      }
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
</style>
