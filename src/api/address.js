/*
 * @Author: wangshengxian
 * @Date: 2020-11-08 22:47:38
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-09 00:22:16
 * @Desc:
 */
import request from '@/utils/request'

const roomApi = '/shop'

/**
 * 获取用户地址列表
 */
function getAddressList(data) {
  return request({
    url: roomApi + '/api/deliveryAddress/list',
    method: 'get',
    data
  })
}

/**
 * 添加用户地址
 */
function addAddress(data) {
  return request({
    url: roomApi + '/api/deliveryAddress/create',
    method: 'post',
    data
  })
}

/**
 * 删除用户指定地址
 */
function delAddress(data) {
  return request({
    url: roomApi + '/api/deliveryAddress/delete',
    method: 'delete',
    data
  })
}

/**
 * 查询指定用户的默认地址
 */
function findDefaultAddress(data) {
  return request({
    url: roomApi + '/api/deliveryAddress/selectDefaultAddress',
    method: 'get',
    data
  })
}
/**
 * 设置为默认收货地址
 */
function setDefaultAddress(data) {
  return request({
    url: roomApi + '/api/deliveryAddress/setDefault',
    method: 'post',
    data
  })
}

/**
 * 修改用户地址
 */
function editAddress(data) {
  return request({
    url: roomApi + '/api/deliveryAddress/updateAddress',
    method: 'post',
    data
  })
}

export default {
  // 获取用户地址
  getAddressList,
  // 添加地址
  addAddress,
  // 删除地址
  delAddress,
  // 查找用户默认地址
  findDefaultAddress,
  // 设置用户默认地址
  setDefaultAddress,
  // 修改地址
  editAddress
}
