/*
 * @Author: wangshengxian
 * @Date: 2020-10-19 15:35:17
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-09 11:49:31
 * @Desc: store模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// TODO: 自动化导入模块文件
const modulesFiles = require.context('./modules', false, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // console.log(module, modulePath)
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // console.log(moduleName)
  const value = modulesFiles(modulePath)
  // console.log(value)
  modules[moduleName] = value.default
  return modules
}, {})

// console.log(modules)

export default new Vuex.Store({
  modules
})
