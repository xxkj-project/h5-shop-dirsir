/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:24:55
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-02 09:55:16
 * @Desc: 入口模块
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Loading from '@/plugins/loading'
import PageLoading from '@/plugins/pageLoading'
import VirtualCollection from 'vue-virtual-collection'
import vantComponents from '@/config/vant.config' // vant组件按需引入配置文件

// 全局样式
import '@/styles/index.less' //
import '@/assets/iconfont/iconfont.css'
// 重置样式插件
import 'normalize.css/normalize.css'
// 路由守卫
import '@/utils/routerGuards.js'
// vconsole调试工具
import '@/utils/vconsole.js'
// rem适配
import '@/config/flexible'
// 全局过滤器
import '@/utils/filters'

import VueClipboard from 'vue-clipboard2' // TODO: 后面优化成按需加载
Vue.use(VueClipboard)
Vue.use(vantComponents)
Vue.use(Loading)
Vue.use(PageLoading)
Vue.use(VirtualCollection) // 渲染大型数据瀑布流插件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
