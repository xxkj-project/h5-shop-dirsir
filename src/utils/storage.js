/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:24:56
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-17 16:25:48
 * @Desc: localStorage封装 (支持过期时间)
 */

import tools from './tools'

// TODO: 后面再优化代码

/**
 * 设置item
 * @param {string} key 键名
 * @param {any} value 键值
 * @param {number} hours 存储时间 (小时) (可选)
 */
function setItem(key, value, hours) {
  if (hours !== undefined && typeof hours === 'number') {
    const expire = tools.formatDate(new Date().getTime() + hours * 3600 * 1000)
    value = { value, expire }
  }
  if (tools.getDataType(value) === 'object' || tools.getDataType(value) === 'array') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

/**
 * 获取item
 */
function getItem(key) {
  let data = localStorage.getItem(key)

  try {
    data = JSON.parse(data)
  } catch (err) {
    return data
  }

  if ((tools.getDataType(data) === 'object' || tools.getDataType(data) === 'array') && data.expire) {
    if (tools.getTimestamp() < tools.getTimestamp(data.expire)) {
      return data.value
    } else {
      return null
    }
  } else {
    return data
  }
}

/**
 * 移除单个item
 */
function removeItem(key) {
  localStorage.removeItem(key)
}
/**
 * 移除全部
 */
function clear() {
  localStorage.clear()
}

// Storage 发生变化（增加、更新、删除）时的 触发，同一个页面发生的改变不会触发，只会监听同一域名下其他页面改变 Storage
window.addEventListener('storage', function(e) {
  console.log('event', e)
  console.log('key', e.key)
  console.log('oldValue', e.oldValue)
  console.log('newValue', e.newValue)
  console.log('url', e.url)
})

export default {
  getItem,
  setItem,
  removeItem,
  clear
}
