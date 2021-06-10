/*
 * @Author: wangshengxian
 * @Date: 2020-11-17 15:11:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-22 20:06:36
 * @Desc: 商品相关 - store
 */

import api from '@/api'
import storage from '@/utils/storage'

const state = {
  // 一级分类列表
  categoryList: storage.getItem('category_list') || []
}

const getters = {}

const mutations = {
  setCategoryList(state, list) {
    state.categoryList = list
  }
}

const actions = {
  // 获取一级分类
  getCategoryList({ commit }) {
    api.getNextCategory().then(res => {
      // console.log('-category-res-', res)
      const data = res.data
      // console.log('-category-list-', data)
      storage.setItem('category_list', data)
      commit('setCategoryList', data)
    })
  },
  // 获取所有的分类(TODO:暂时不用)
  getCategoryListCopy({ commit }) {
    api.getCategoryList().then(res => {
      // console.log('-category-res-', res)
      const data = res.data
      let list = [],
        secondMenu = []
      data.map(val => {
        if (val.parentId == 0) {
          list.push({ ...val, children: [] })
        } else {
          secondMenu.push(val)
        }
      })
      // console.log('-分类一级菜单-', list, '-分类二级菜单-', secondMenu)
      secondMenu.map(val => {
        let key = val.parentId - 1
        list[key].children.push(val)
      })
      // console.log(list)
      // let list = data.filter(val => val.parentId == 0)
      // console.log('-category-list-', list)
      storage.setItem('category_list', list)
      commit('setCategoryList', list)
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
