/*
 * @Author: wangshengxian
 * @Date: 2020-11-17 11:21:28
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-17 11:51:21
 * @Desc: 订单 - store
 */

import api from '@/api/order'

const state = {
  // 待付款订单数
  payNum: 0,
  // 待发货订单数
  sendNum: 0,
  // 订单全部列表
  list: []
}

const getters = {}

const mutations = {
  setPayNum(state, num) {
    state.payNum = num
  },
  setOrderList(state, list) {
    state.list = list
  }
}

const actions = {
  getOrderNum({ commit }) {
    // TODO: 此处后台提供一个接口
    console.log('请求待付款和待发货订单数')
  },
  getOrderList({ commit }, orderStatus = 'All') {
    const params = { orderStatus }
    console.log('-params-', params)
    api.getOrderItem(params).then(res => {
      console.log('-res-', res)
      const list = res.data
      commit('setOrderList', list)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
