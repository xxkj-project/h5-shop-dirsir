/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:24:56
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-11 14:07:38
 * @Desc: Cookies封装
 */

/**
 * 设置cookie
 * @param {string} name 需要存储的cookie的key
 * @param {string} value 需要存储的cookie的value
 * @param {number} timer 存储的时间，默认为一天
 */
function setCookie(name, value, timer = 1) {
  let exp = new Date()
  exp.setTime(exp.getTime() + timer * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + 'expires=' + exp.toGMTString()
}

/**
 * 获取cookie
 * @param {string} name 获取cookie的key
 */
function getCookie(name) {
  var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  console.log('-cookie-', arr)
  if (arr != null) {
    return unescape(arr[2])
  } else {
    return null
  }
}

/**
 * 删除cookie
 * @param {string} name 删除cookie的key
 */
function clearCookie(name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}

export default {
  setCookie,
  getCookie,
  clearCookie
}
