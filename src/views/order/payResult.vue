<!--
 * @Author: wangshengxian
 * @Date: 2020-11-09 09:52:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-22 17:47:01
 * @Desc: 支付结果界面 - page
-->
<template>
  <div class="pay-result-page" :style="{ height: pageHeight }">
    <headerBar />

    <div class="main">
      <div class="container fx-column-center">
        <span class="iconBg" :class="iconClass"></span>
        <p class="descTxt">{{ descTxt }}</p>

        <div class="payInfoWrap fx-column-center">
          <p class="title title1">
            请先复制订单号，然后长按二维码，添加掌柜微信进行支付
          </p>
          <p class="title title2">或者复制微信号，添加掌柜微信进行支付</p>

          <div class="payInfoContainer">
            <div class="item fx-space-between-center">
              <p>订单编号：{{ payInfoObj.orderNo }}</p>
              <copyTxt :txt="payInfoObj.orderNo" isCustom @success="handleOrderSuccess" />
            </div>

            <div class="item fx-space-between-center">
              <p>掌柜微信二维码：</p>
              <img class="img" :src="payInfoObj.pic" alt="" v-if="payInfoObj.pic" />
            </div>

            <div class="item fx-space-between-center">
              <p>掌柜微信号：{{ payInfoObj.account }}</p>
              <copyTxt :txt="payInfoObj.account" isCustom @success="handleWxSuccess" />
            </div>
          </div>
        </div>

        <div class="btnBox flexbox">
          <van-button class="leftBtn flex1" round @click="onBackHome">返回首页</van-button>
          <van-button class="rightBtn flex1" round @click="onCheckedOrder" v-if="isSuccess">查看订单</van-button>
          <van-button class="rightBtn flex1" round @click="onBuyAgain" v-else>重新购买</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import copyTxt from '@/components/copyTxt'
import Cookie from 'js-cookie'
import storage from '@/utils/storage'
export default {
  data() {
    return {}
  },
  computed: {
    pageHeight() {
      return window.innerHeight + 'px'
    },
    code() {
      return Cookie.get('code')
    },
    queryObj() {
      // console.log(this.$route.query)
      return this.$route.query
    },
    money() {
      return this.queryObj.payment
    },
    payInfoObj() {
      // console.log(JSON.parse(this.queryObj.payInfoObj))
      return JSON.parse(this.queryObj.payInfoObj)
    },
    isSuccess() {
      // code = 200 为支付成功
      return this.queryObj.code == 200
    },
    iconClass() {
      return this.isSuccess ? 'icon-success' : 'icon-fail'
    },
    descTxt() {
      return this.isSuccess ? `下单成功，待付款${this.money}元` : '下单失败'
    }
    // descTxt() {
    //   return this.isSuccess ? '购买成功' : '购买失败'
    // },
  },
  mounted() {
    // TODO: 注意，该界面访问的地址，为后台支付成功后跳转过来的，若该界面路由改变了后台同步更改，该界面路由一般不要随便改变
  },
  methods: {
    handleWxSuccess() {
      this.$toast('微信号复制成功！')
    },
    handleOrderSuccess() {
      this.$toast('订单编号复制成功！')
    },
    // 返回首页
    onBackHome() {
      const path = `/index/${this.code}`
      this.$store.commit('global/setEnterPageName', [path])
      this.$router.replace(path)
    },
    // 查看订单
    onCheckedOrder() {
      // TODO: 去订单列表页
      this.$router.replace({
        name: 'Order',
        query: { status: 'All', fromRouteName: 'PayResult' }
      })
    },
    // 重新购买
    onBuyAgain() {
      if (storage.getItem('confirm_order_query')) {
        const skus = storage.getItem('confirm_order_query')
        // console.log('333', skus)
        this.$router.push({
          name: 'ConfirmOrder',
          query: { skus: JSON.stringify(skus) }
        })
      } else {
        const path = `/index/${this.code}`
        this.$store.commit('global/setEnterPageName', [path])
        this.$router.replace(path)
      }
    }
  },
  components: { headerBar, copyTxt }
}
</script>

<style scoped lang="less">
@imgUrl: '~@/assets/images/order/';

.pay-result-page {
  height: 100%;
  background: #fff;
  .container {
    // padding: 36px 15px 0;
    padding: 24px 15px 0;
  }
}

.iconBg {
  width: 108px;
  height: 95px;

  &.icon-success {
    background: url('@{imgUrl}icon-pay-success.png') no-repeat center / cover;
  }
  &.icon-fail {
    background: url('@{imgUrl}icon-pay-fail.png') no-repeat center / cover;
  }
}

.descTxt {
  font-size: 22px;
  font-weight: 600;
  // padding: 24px 0 64px 0;
  padding: 36px 0 20px 0;
}

.payInfoWrap {
  width: 100%;
  font-size: 16px;
  padding: 10px 0 24px;

  .title {
    width: 80%;
    font-size: 14px;
    line-height: 36px;
    color: #999;

    &.title2 {
      margin-bottom: 12px;
    }
  }
  .payInfoContainer {
    width: 80%;

    .nickname {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .item {
      line-height: 36px;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }

      .img {
        display: block;
        width: 100px;
        height: 100px;
      }
    }
  }
}

.btnBox {
  width: 100%;
  font-size: 16px;
  .leftBtn {
    color: #5fc0a3;
    border: 1px solid #5fc0a3;
    margin-right: 16px;
  }
  .rightBtn {
    background: #5fc0a3;
    line-height: 22px;
    color: #fff;
  }
}
</style>
