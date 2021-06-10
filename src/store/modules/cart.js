/*
 * @Author: wangshengxian
 * @Date: 2020-11-16 18:19:50
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-14 11:29:27
 * @Desc: 购物车 - store
 */

import api from '@/api/cart'
import Cookie from 'js-cookie'

const state = {
  // 购物车数量
  cartNum: Cookie.get('cart_num') || 0
}
const getters = {}
const mutations = {
  setCartNum(state, num) {
    // console.log('-cart-', num)
    state.cartNum = num
  }
}
const actions = {
  // 获取购物车商品数量
  async getCartNum({ commit }, num = 0) {
    if (!num) {
      await api.getCartList().then(res => {
        // console.log('-actions-res-', res)
        const list = res.data.shopItems
        if (list.length > 0) {
          num = list[0].cartItems.length
        }
        // res.data.shopItems.forEach(shop => {
        //   shop.cartItems.forEach(goods => {
        //     num += 1
        //   })
        // })
      })
    }
    console.log('-cart-num-', num)
    commit('setCartNum', num)
    Cookie.set('cart_num', num, { expires: 1 })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
