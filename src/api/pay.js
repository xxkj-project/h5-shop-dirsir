/*
 * @Author: wangshengxian
 * @Date: 2020-11-30 14:12:49
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-30 14:31:49
 * @Desc: 支付接口 - api
 */

import request from '@/utils/request'

const rootApi = '/cms'

/**
 * 获取支付列表
 * */
function getPayList(data) {
  return request({
    url: rootApi + '/payAccount/list',
    method: 'get',
    data
  })
}

export default {
  // 获取支付列表
  getPayList
}
