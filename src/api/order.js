/*
 * @Author: wangshengxian
 * @Date: 2020-11-06 16:01:42
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-13 16:17:35
 * @Desc: 订单 - api
 */
import request from '@/utils/request'

const roomApi = '/shop'

/**
 * 订单结算(订单确认界面)
 */
function orderSettlement(
  data = {
    cartItemId: 0,
    quantity: 0,
    remark: 0,
    skuId: 0
  }
) {
  return request({
    url: roomApi + '/api/order/settlement',
    method: 'post',
    data
  })
}

/**
 * 订单提交(下单接口)
 */
function orderSubmit(
  data = {
    addresseeId: 0,
    skus: {
      cartItemId: 0,
      quantity: 0,
      remark: '',
      skuId: 0
    }
  }
) {
  return request({
    url: roomApi + '/api/order/submit',
    method: 'post',
    data
  })
}

// ===========================子订单==========================

/**
 * 订单列表 订单状态 -- ['All', 'TO_PAY', 'TO_SEND', 'TO_RECEIVE']
 * @param {object} data 例如： {orderStatus: 'All'}
 */
function getOrderItem(
  data = {
    orderStatus: 'All'
  }
) {
  return request({
    url: roomApi + '/api/orderItem',
    method: 'post',
    data
  })
}

/**
 * 订单详情
 * @param {object} data 例如： {id: 12}
 */
function getOrderDetails(data) {
  return request({
    url: roomApi + `/api/orderItem/${data.id}`,
    method: 'get',
    data: {}
  })
}

/**
 * 删除订单
 * @param {object} data {id: 0}
 */
function delOrderItem(data) {
  return request({
    url: roomApi + `/api/orderItem/${data.id}`,
    method: 'delete',
    data: {}
  })
}

/**
 * 修改地址
 * @param {object} data {id: 0, requestVO: {addressId: 0}}
 */
function editOrderAddress(
  data = {
    id: 0,
    requestVO: { addressId: 0 }
  }
) {
  return request({
    url: roomApi + `/api/orderItem/${data.id}/address`,
    method: 'put',
    data
  })
}

/**
 * 取消订单
 * @param {object} data {id: 0}
 */
function cancelOrder(data) {
  return request({
    url: roomApi + `/api/orderItem/${data.id}/cancel`,
    method: 'put',
    data: {}
  })
}

/**
 * 确认收货
 * @param {object} data {id: 0}
 * error code:
ORDER_NOT_FOUND 订单不存在
USER_ORDER_NOT_MATCH 此订单不属于该用户
ORDER_ITEM_STATUS_NOT_SUPPORT 该订单状态不是待收货状态
 */
function confirmReceipt(data) {
  return request({
    url: roomApi + `/api/orderItem/${data.id}/receive`,
    method: 'put',
    data
  })
}

/**
 * 支付(当前只有支付宝支付)
 * @param {object} data {mainOrder: true,orderId: 0}
 */
function orderPay(data) {
  // data = { mainOrder: true, ...data }
  return request({
    url: roomApi + '/api/pay/alipay',
    method: 'post',
    data
  })
}

export default {
  // 订单结算
  orderSettlement,
  // 订单提交
  orderSubmit,
  // 获取订单列表
  getOrderItem,
  // 获取订单详情
  getOrderDetails,
  // 删除订单
  delOrderItem,
  // 修改地址
  editOrderAddress,
  // 取消订单
  cancelOrder,
  // 取人收货
  confirmReceipt,
  // 支付
  orderPay
}
