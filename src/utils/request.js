/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:24:56
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-14 09:57:06
 * @Desc: axios请求拦截
 */
import axios from 'axios'
import { Toast, Dialog } from 'vant'
import store from '@/store'
import router from '@/router'

console.log('-server-url-', process.env.VUE_APP_SERVER_URL)

// 错误码说明
const resErrorMsg = {
  CART_ITEM_NOT_FOUND: '购物车项目不存在',
  DELIVERY_ADDRESS_NOT_FOUND: '收货地址不存在',
  USER_DELIVERY_ADDRESS_NOT_MATCH: '当前收货地址不是该用户的收货地址',
  LOGISTICS_COMPANY_NOT_FOUND: '物流公司不存在',
  ORDER_NOT_FOUND: '订单不存在',
  USER_ORDER_NOT_MATCH: '该订单不是当前用户的订单',
  ORDER_ITEM_NOT_FOUND: '订单明细信息不存在',
  ITEM_PRODUCT_NOT_FOUND: '订单商品信息不存在',
  ORDER_LAUNCH_PAY: '订单已发起支付',
  ORDER_ALREADY_PAID: '订单已付款',
  USER_ORDER_ITEM_NOT_MATCH: '该订单项不属于该用户',
  ORDER_ITEM_ALREADY_PAID: '订单项已付款',
  ORDER_ITEM_STATUS_NOT_SUPPORT: '订单项状态不支持该操作',
  ORDER_LOGISTICS_NOT_FOUND: '订单物流不存在',
  NOT_FOUND: '商品不存在',
  SKU_NOT_FOUND: 'sku 不存在',
  DUPLICATE_SKU_ID: '重复的sku id',
  SKU_NOT_ENOUGH: 'sku 库存不足',
  USER_NOT_FOUND: '用户不存在',
  SHOP_NOT_FOUND: '店铺不存在',
  PRODUCT_NOT_SHELVE_DOWN: '商品已下架'
}

const service = axios.create()

// 请求拦截
service.interceptors.request.use(
  config => {
    // 超时
    // config.timeout = config.timeout || 10000
    config.timeout = config.timeout || 100000

    // header
    if (store.state.user.key) {
      // config.headers['key'] = encodeURIComponent(store.state.user.key) // 让每个请求携带token-- ['Admin-Token']为自定义key 请根据实际情况自行修改
      config.headers['key'] = store.state.user.key
    } else {
      // 没有key时候的错误提示
      new Error({ message: 'No user Key, please log in again!' })
    }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // config.headers['Content-Type'] = 'multipart/form-data'
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    // if (!config.baseURL.match(/^http/)) {
    //   if (process.env.NODE_ENV === 'development') {
    //     config.baseURL = `${process.env.VUE_APP_PROXY_CODE}/${process.env.VUE_APP_SERVER_ENV}${config.baseURL}`
    //   }
    // }
    // 设置语言类型 0中文，2英文
    config.headers['language'] = 0
    // 请求方法(默认为post)
    config.method = config.method || 'post'
    // 参数
    if (config.method === 'get' || config.method === 'delete') {
      config.params = config.data || config.params
    } else {
      config.data = config.data || {}
    }
    // if (config.method === 'get') {
    //   if (!config.params && config.data) {
    //     config.params = config.data
    //     config.data = undefined
    //   }
    // }
    // console.log('-config-', config)
    return config
  },
  error => {
    console.log('__REQ_ERROR__', error)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log('响应拦截', res)
    // 请求成功
    if (+res.code === 200) {
      return res
    }
    // 其它情况不符合预期抛出错误提示
    if (typeof res.msg === 'string') {
      try {
        const message = resErrorMsg[res.code]
        if (!message) throw new Error()
        Toast({ message: message, duration: 1000 })
      } catch {
        Toast({ message: res.msg, duration: 1000 })
      }
    }
    // console.log('-other-res-', res)
    return Promise.reject(res)
  },
  error => {
    console.log('响应错误！！！')
    console.log('__RES_ERROR__', error)
    Toast({
      message: 'error：' + error.message,
      duration: 2000
    })
    return Promise.reject(error)
  }
)

// 请求实例
export default service
