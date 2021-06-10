/*
 * @Author: wangshengxian
 * @Date: 2020-10-30 16:39:25
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-13 16:36:40
 * @Desc: 全局常量 - 状态
 */

/**
 * 订单状态枚举(方便后期使用TypeScript重构)
 */
export const orderEnum = {
  /**
   * 全部
   */
  ALL: 'All',
  /**
   * 待付款 (orderStatus == 1)
   */
  TO_PAY: 'TO_PAY',
  /**
   * 待发货 (orderStatus == 2)
   */
  TO_SEND: 'TO_SEND',
  /**
   * 待收货 (orderStatus == 3)
   */
  TO_RECEIVE: 'TO_RECEIVE',
  /**
   * 交易完成 (orderStatus == 4)
   */
  FINISH: 'FINISH',
  /**
   * 交易关闭 (orderStatus == 5)
   */
  CLOSE: 'CLOSE',
  /**
   * 申请退款
   */
  APPLY_REFUND: 'APPLY_REFUND',
  /**
   * 退款
   */
  REFUND: 'REFUND'
}

/**
 * 退款状态
 */
export const orderRefundStatus = {
  '1': '申请退款中',
  '2': '申请退款中',
  '3': '申请退款中',
  '4': '申请退款中',
  '5': '退款成功',
  '6': '退款失败'
}
