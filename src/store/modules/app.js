/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:24:56
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-09 11:50:24
 * @Desc: app - store
 */

const state = {
  // 客户端环境(Android/ios)
  device: '',
  // 顶部状态栏高度
  statusBarHeight: '0'
  // statusBarHeight: '20',
}

const getters = {}

const mutations = {
  setDevice(state, device) {
    state.device = device
  },
  setStatusBarHeight(state, h) {
    state.statusBarHeight = h
  }
}

const actions = {}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
