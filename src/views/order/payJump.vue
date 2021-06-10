<!--
 * @Author: wangshengxian
 * @Date: 2020-11-13 10:29:13
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-26 16:29:47
 * @Desc: 支付跳转页
-->
<template>
  <div class="pay-before"></div>
</template>

<script>
// 支付跳转页面
import Cookie from 'js-cookie'
import api from '@/api/order'
export default {
  mounted() {
    const { mainOrder, orderId } = this.$route.query
    console.log('-payJump-query-', mainOrder, orderId)
    if (Cookie.get('back') && JSON.parse(Cookie.get('back'))) {
      // 调出支付宝界面后
      if (mainOrder) {
        // TODO: 去订单列表页
        this.$router.replace({ name: 'Order', query: { status: 'TO_PAY', fromRouteName: 'PayJump' } })
      } else {
        this.$router.back()
      }
      return
    }
    this.getData(mainOrder, orderId)
  },
  methods: {
    runCode(html) {
      Cookie.set('back', true)
      var newwin = window.open('', '_self', '')
      newwin.opener = null
      newwin.document.write(html)
      newwin.document.close()
    },
    getData(mainOrder, orderId) {
      const params = { mainOrder, orderId }
      console.log('-调用支付宝-params-', params)
      api
        .orderPay(params)
        .then(res => {
          console.log('-res-', res)
        })
        .catch(err => {
          console.log('_PAY_ERR_', err)
          //           错误码: ORDER_NOT_FOUND 订单不存在
          // USER_ORDER_NOT_MATCH 该订单不是当前用户的订单
          // ORDER_ALREADY_PAID 订单已付款
          if (err.msg) {
            this.$toast(err.msg)
            // TODO: 订单不存在等报错，需要自行处理
            // this.$router.go(-1)
          } else {
            // 订单存在，并下单成功后，返回支付宝跳转支付界面
            this.runCode(err)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
