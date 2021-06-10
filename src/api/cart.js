/*
 * @Author: wangshengxian
 * @Date: 2020-11-05 14:17:45
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-09 00:21:17
 * @Desc: 购物车 - api
 */
import request from '@/utils/request'
// import Qs from 'qs'

const roomApi = '/shop'

/**
 * 获取用户购物车
 */
function getCartList() {
  return request({
    url: roomApi + '/api/cart',
    method: 'get',
    data: {}
  })
}

/**
 * 添加购物车
 */
function addCart(data) {
  return request({
    url: roomApi + '/api/cart/add',
    method: 'put',
    data
  })
}

/**
 * 修改购物车购买数量
 */
function editCartNum(data) {
  return request({
    url: roomApi + '/api/cart/modify',
    method: 'post',
    data
  })
}

/**
 * 删除有效的购物车项
 */
function deleteCart(data) {
  return request({
    url: roomApi + '/api/cart/delete',
    method: 'delete',
    data
  })
}

/**
 * 清除无效的购物车项
 */
function clearCart(data) {
  return request({
    url: roomApi + '/api/cart/clear',
    method: 'delete',
    data
  })
}

export default {
  // 获取用户购物车
  getCartList,
  // 添加购物车
  addCart,
  // 修改购物车数量
  editCartNum,
  // 删除有效购物车项
  deleteCart,
  // 清除无效的购物车项
  clearCart
}
