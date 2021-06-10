/*
 * @Author: wangshengxian
 * @Date: 2020-11-20 16:29:48
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-20 16:47:37
 * @Desc:
 */

import request from '@/utils/request'

const rootApi = '/shop'

/**
 * 根据商品名称/分类/描述搜索商品
 */
function getResultData(data) {
  return request({
    url: rootApi + '/api/product/search',
    method: 'get',
    data
  })
}

/**
 * 搜索记录
 */
function getSearchRecord() {
  return request({
    url: rootApi + '/api/product/searchRecord',
    method: 'get',
    data: {}
  })
}

/**
 * 删除搜索记录
 */
function deleteSearchRecord() {
  return request({
    url: rootApi + '/api/product/deleteSearchRecord',
    method: 'get',
    data: {}
  })
}

export default {
  // 搜索查询结果
  getResultData,
  // 搜索记录
  getSearchRecord,
  // 删除搜索记录
  deleteSearchRecord
}
