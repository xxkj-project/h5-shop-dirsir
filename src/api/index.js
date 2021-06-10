/*
 * @Author: wangshengxian
 * @Date: 2020-10-19 15:35:17
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-17 15:48:26
 * @Desc: 部分api接口
 */
// import http from '@/utils/http'

import request from '@/utils/request'

// http://tapi.tangseng.io:8620/im/swagger-ui.html
// http://tapi.tangseng.io:8621/shop/swagger-ui.html

const rootApi = '/shop'

/**
 * 首页推荐商品
 */
function getRecommendList(data) {
  return request({
    url: rootApi + '/api/product/recommendProduct',
    method: 'get',
    data
  })
}

/**
 * 商品详情
 * @param {object} data 例如： {id: '10099'}
 */
function getGoodsDetails(data) {
  return request({
    url: rootApi + `/api/product/${data.id}`,
    method: 'get',
    data: {}
  })
}

/**
 * 获取商品规格
 * @param {object} data 例如： {id: '10099'}
 */
function getGoodsSku(data) {
  return request({
    url: rootApi + `/api/product/sku/${data.id}`,
    method: 'get',
    data: {}
  })
}

/**
 * 所有的商品分类
 */
function getCategoryList() {
  return request({
    url: rootApi + '/api/category',
    method: 'get',
    data: {}
  })
}

/**
 * 下一级分类，获取一级分类 id 默认为 0，可以不传
 */
function getNextCategory(data = { id: 0 }) {
  return request({
    url: `${rootApi}/api/category/${data.id}`,
    method: 'get',
    data: {}
  })
}

/**
 * 分类下的商品
 * @param {number} id 分类id
 * @param {object} data 例如： {pageNum: 1,pageSize: 10}
 */
function getCategoryGoods({ id, ...data }) {
  return request({
    url: rootApi + `/api/category/${id}/product`,
    method: 'get',
    data
  })
}

export default {
  // 首页推荐商品
  getRecommendList,
  // 商品详情
  getGoodsDetails,
  // 获取商品规格
  getGoodsSku,
  // 所有的商品分类
  getCategoryList,
  // 下一级分类
  getNextCategory,
  // 分类下的商品
  getCategoryGoods
}

const otherApi = {
  // 消费挖矿
  // getConsumetMining: () => http('/live/user/consume/mining', {}, 'get'),
  // // 首页(用户信息)
  // getTsInfo: () => http('/live/user/ts/info', {}, 'get'),
  // // 充值记录
  // getRechargeRecord: params => http('/live/api/recharge/my/record', params, 'get')
}
