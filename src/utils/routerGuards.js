/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:24:56
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-09 10:55:16
 * @Desc: 路由守卫模块
 */
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import glg from './globalGuards'
import store from '@/store'

// 白名单
const whiteList = [
  '/login',
  '/goodsDetails',
  '/classify',
  '/classifyList',
  '/search',
  '/searchResult',
  '/buyNotes',
  '/aboutUs'
]

NProgress.configure({ showSpinner: false }) // 禁用进度环

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  // first progress bar
  NProgress.start()
  // 设置状态栏高度
  // glg.setStatusBarHeight(to, from)
  // 设置路由状态
  // glg.setRouteStatus(to, from)
  // 路由改变修改页面title(setDocumentTitle)
  glg.setDocumentTitle(to, from)
  // 存储路由跳转的path
  glg.setRoutePath(to, from)

  if (to.path.indexOf('/index/') != -1) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // console.log('-key-', store.state.user.key)
      if (store.state.user.key) {
        next()
      } else {
        if (from.path === '/login') {
          next()
        } else {
          console.log('-啥都没得--还不去登录页-')
          setTimeout(() => {
            next('/login')
          }, 500)
        }
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
