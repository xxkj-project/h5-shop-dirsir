/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:24:56
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-09 10:54:06
 * @Desc: 全局状态守卫
 */
import store from '@/store'
import storage from '@/utils/storage'
import { Toast } from 'vant'

const auth = ['/cart', '/my']

/**
 * 设置顶部状态栏高度
 */
function setStatusBarHeight(to, from) {
  if (to.query.statusBarHeight) {
    let statusBH = to.query.statusBarHeight
    console.log('-statusBarHeight-', statusBH)
    store.commit('app/setStatusBarHeight', statusBH)
  }
}

/**
 * 修改页面title
 */
function setDocumentTitle(to, from) {
  document.title = '' // TODO 根据具体的项目自行更改
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
    // console.log(document.title)
  }
}

/**
 * 跳转登录页
 */
function jumpNeedLogin(to, from, next) {
  console.log('-to-path-', to.path)
  if (auth.includes(to.path)) {
    if (store.getters && !store.getters['user/key']) {
      console.log('没有key，需要先去登录')
      if (from.path != '/login') {
        // console.log(from)
        console.log('去登录页')
        next('/login')
      }
    }
  }
}

let hrefArr = []

/**
 * 设置路由状态(前进/后退)
 */
function setRouteStatus(to, from) {
  if (to.path === hrefArr[hrefArr.length - 2]) {
    hrefArr.splice(-2, 2)
    // console.log('后退')
    store.commit('global/updateDirection', 'backward')
  } else {
    hrefArr.push(from.path, to.path)
    // console.log('前进')
    store.commit('global/updateDirection', 'forward')
  }
  console.log('-router-history-', hrefArr)
}

/**
 * 存储路由跳转的path
 */
function setRoutePath(to, from) {
  let paths = [to.path, from.path]
  store.commit('global/setRoutes', paths)
}

export default {
  setStatusBarHeight,
  setDocumentTitle,
  jumpNeedLogin,
  setRouteStatus,
  setRoutePath
}
