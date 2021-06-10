/*
 * @Author: wangshengxian
 * @Date: 2020-11-04 14:50:53
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-27 17:59:37
 * @Desc: 登录相关 api
 */
import request from '@/utils/request'
import Qs from 'qs'

const rootIm = '/im'

/**
 * 发送短信验证码 (type = 短信类型 1注册 2忘记密码 3绑定手机号)
 * @param {object} data {mobile: 13896872561,type: 1}
 *
 */
function sendCode(data) {
  data = { mobilePrefix: '86', ...data }
  return request({
    url: `${rootIm}/common/sendMsg?${Qs.stringify(data)}`,
    method: 'post',
    data: {}
  })
}

/**
 * 手机号注册
 * @param {object} data {mobile: 0, code: 0, account: '', pass: '',  agentId: 0}
 */
function mobileRegister(data) {
  data = { mobilePrefix: '86', ...data }
  return request({
    url: `${rootIm}/user/mobile?${Qs.stringify(data)}`,
    method: 'post',
    data: {}
  })
}

/**
 * TODO: 暂时不用
 * 邮箱注册
 * @param {object} data {mail: '',account: '',pass: '', code: 0, agentId: 0}
 */
function mailRegister(data) {
  return request({
    url: `${rootIm}/user/mail?${Qs.stringify(data)}`,
    method: 'post',
    data: {}
  })
}

/**
 * 登录
 * @param {object} data {account: 0, pass: 0}
 */
function logIn(data) {
  return request({
    url: `${rootIm}/user/loginByAccount?${Qs.stringify(data)}`,
    method: 'post',
    data: {}
  })
}

/**
 * 用户信息
 */
function getUserInfo() {
  return request({
    url: rootIm + '/user/info',
    method: 'get',
    data: {}
  })
}

/**
 * 修改用户信息
 */
function editUserInfo(data) {
  data = { ...data, gender: '', province: '', signatures: '', city: '' }
  return request({
    url: `${rootIm}/user/updateUser?${Qs.stringify(data)}`,
    method: 'post',
    data: {}
  })
}

/**
 * 修改头像
 */
function editIcon(data) {
  return request({
    url: rootIm + '/user/updateUserHead',
    method: 'post',
    data
  })
}

export default {
  // 发送短信验证码
  sendCode,
  // 手机号注册
  mobileRegister,
  // 邮箱注册
  mailRegister,
  // 登录
  logIn,
  // 用户信息
  getUserInfo,
  // 修改用户信息
  editUserInfo,
  // 修改头像
  editIcon
}
