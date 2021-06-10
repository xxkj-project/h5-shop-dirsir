/*
 * @Author: wangshengxian
 * @Date: 2020-10-19 15:35:17
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-02 11:11:28
 * @Desc: 用户全局状态 - store
 */

import Cookie from 'js-cookie'

export default {
  // 开启命名空间
  namespaced: true,
  state: {
    code: Cookie.get('code') || '', // 代理商渠道码
    key: Cookie.get('key') || '',
    userInfo: Cookie.get('userInfo') || {}
  },
  getters: {
    code(state) {
      return state.code
    },
    userInfo(state) {
      // console.log(typeof state.userInfo)
      return typeof state.userInfo === 'object' ? state.userInfo : JSON.parse(state.userInfo)
    }
  },
  mutations: {
    setCode(state, code) {
      state.code = code
    },
    setKey(state, key) {
      state.key = key
    },
    setUserInfo(state, userInfo) {
      console.log('-userInfo-', userInfo)
      state.userInfo = userInfo
    }
  },
  actions: {
    // logOut({ commit, rootState }) {
    //   Cookie.remove('key')
    //   commit('setKey', '')
    //   const path = `/index/${rootState.user.code}`
    //   router.push(path)
    // }
  }
}
