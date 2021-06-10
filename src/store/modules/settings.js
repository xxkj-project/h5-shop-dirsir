/*
 * @Author: wangshengxian
 * @Date: 2020-10-20 11:15:22
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-25 14:29:19
 * @Desc: settings - store(设置footerNav的显示等等)
 */
const state = {
  // 是否隐藏header-bar，默认false
  hiddenHeader: false,
  // 是否显示footer-nav，默认false
  showFooter: false,
  // footer-nav 选中的选项下标
  footActIdx: 0
}
const getters = {}
const mutations = {
  setHiddenHeader(state, val) {
    state.hiddenHeader = val
  },
  setShowFooter(state, val) {
    state.showFooter = val
  },
  setFootActIdx(state, idx) {
    state.footActIdx = idx
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
