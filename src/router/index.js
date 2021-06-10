/*
 * @Author: wangshengxian
 * @Date: 2020-10-19 15:35:17
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-15 18:09:57
 * @Desc: 路由模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index/:code',
    name: 'Index',
    component: () => import(/* webpackChunkName: 'index' */ '@/views/index'),
    meta: {
      title: '顶级原单购物网站',
      showFooter: true
    }
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: 'my' */ '@/views/my'),
    meta: {
      title: '我的',
      showFooter: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: 'cart' */ '@/views/cart'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: 'search' */ '@/views/search'),
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    component: () => import(/* webpackChunkName: 'searchResult' */ '@/views/search/result'),
    meta: {
      title: '搜索结果'
    }
  },
  {
    path: '/classify',
    name: 'Classify',
    component: () => import(/* webpackChunkName: 'classify' */ '@/views/classify'),
    meta: {
      title: '分类'
    }
  },
  {
    path: '/classifyList',
    name: 'ClassifyList',
    component: () => import(/* webpackChunkName: 'classifyList' */ '@/views/classify/classifyList'),
    meta: {
      title: '分类商品'
    }
  },
  {
    path: '/goodsDetails',
    name: 'GoodsDetails',
    component: () => import(/* webpackChunkName: 'goodsDetails' */ '@/views/goodsDetails'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: 'order' */ '@/views/order'),
    meta: {
      title: '订单列表'
    }
  },
  {
    path: '/orderDetails',
    name: 'OrderDetails',
    component: () => import(/* webpackChunkName: 'orderDetails' */ '@/views/order/orderDetails'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: () => import(/* webpackChunkName: 'confirmOrder' */ '@/views/order/confirmOrder'),
    meta: {
      title: '订单确认'
    }
  },
  {
    path: '/payJump',
    name: 'PayJump',
    component: () => import(/* webpackChunkName: 'payJump' */ '@/views/order/payJump'),
    meta: {
      title: '支付'
    }
  },
  // 新版支付页
  {
    path: '/pay',
    name: 'Pay',
    component: () => import(/* webpackChunkName: 'pay' */ '@/views/order/pay'),
    meta: {
      title: '支付'
    }
  },
  {
    path: '/payResult',
    name: 'PayResult',
    component: () => import(/* webpackChunkName: 'payResult' */ '@/views/order/payResult'),
    meta: {
      title: '下单结果'
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: 'address' */ '@/views/address'),
    meta: {
      title: '收货地址'
    }
  },
  {
    path: '/addAddress',
    name: 'AddAddress',
    component: () => import(/* webpackChunkName: 'addAddress' */ '@/views/address/addAddress'),
    meta: {
      title: '新建地址'
    }
  },
  {
    path: '/mySet',
    name: 'MySet',
    component: () => import(/* webpackChunkName: 'mySet' */ '@/views/my/mySet'),
    meta: {
      title: '我的设置'
    }
  },
  {
    path: '/personalDetails',
    name: 'PersonalDetails',
    component: () => import(/* webpackChunkName: 'personalDetails' */ '@/views/my/personalDetails'),
    meta: {
      title: '个人信息'
    }
  },
  {
    path: '/kefu',
    name: 'Kefu',
    component: () => import(/* webpackChunkName: 'kefu' */ '@/views/my/kefu'),
    meta: {
      title: '客服中心'
    }
  },
  {
    path: '/aboutUs',
    name: 'AboutUs',
    component: () => import(/* webpackChunkName: 'aboutUs' */ '@/views/my/aboutUs'),
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/buyNotes',
    name: 'BuyNotes',
    component: () => import(/* webpackChunkName: 'buyNotes' */ '@/views/my/buyNotes'),
    meta: {
      title: '购买须知'
    }
  },
  {
    path: 'editNickname',
    name: 'EditNickname',
    component: () => import(/* webpackChunkName: 'editNickname' */ '@/views/my/editNickname'),
    meta: {
      title: '修改昵称'
    }
  }
]

const errorPage = [
  {
    path: '/errorPage',
    name: 'ErrorPage',
    component: () => import(/* webpackChunkName: 'errorPage' */ '@/views/errorPage/404')
  }
]

// console.log('-router-', routes)

/**
 * { path: '',
 *   name: '',
 *   component: () => import(''),
 *    meta: {
 *      title: '',
 *      hiddenHeader: false // 当前页面顶部标题栏是否隐藏，默认为false
 *      hiddenFooter: false // 当前页面底部导航是否隐藏，默认为false
 *    }
 * }
 */

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.concat(errorPage)
})
export default router
