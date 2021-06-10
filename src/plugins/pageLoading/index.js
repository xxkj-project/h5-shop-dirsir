/*
 * @Author: wangshengxian
 * @Date: 2020-10-28 09:56:30
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-28 10:00:56
 * @Desc: loading插件
 */

import loadingComp from './index.vue'

let $vm

export default {
  install: function(Vue, option = {}) {
    if (!$vm) {
      const LoadingConstructor = Vue.extend(loadingComp)
      // $vm = new LoadingConstructor({el: document.createElement('div')})
      $vm = new LoadingConstructor()
      $vm.$mount(document.createElement('div'))
      document.documentElement.appendChild($vm.$el)
    }
    const loading = {
      show(text) {
        $vm.isShow = true
        $vm.text = text
      },
      hide() {
        $vm.isShow = false
        $vm.text = ''
      }
    }
    Vue.prototype.$pageLoading = loading
    return Vue
  }
}
