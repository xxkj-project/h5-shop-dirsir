/*
 * @Author: wangshengxian
 * @Date: 2020-11-09 00:06:21
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-09 11:40:36
 * @Desc: im - api
 */
import request from '@/utils/request'

const roomApi = '/im'

/**
 * 获取所有国家信息(中国默认的pid: 7)
 */
function getCountry(data) {
  return request({
    url: roomApi + '/htLocation/country',
    method: 'get',
    data
  })
}

/**
 * TODO: 获取第一级省份固定 pid = 7
 * 获取省市区(通过pid来获取下一级的地区信息)
 */
function getAddressInfo(data) {
  return request({
    url: roomApi + '/htLocation/location',
    method: 'get',
    data
  })
}

export default {
  // 获取所有国家信息
  getCountry,
  // 获取下一级地区的信息
  getAddressInfo
}
