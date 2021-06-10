/*
 * @Author: wangshengxian
 * @Date: 2020-11-11 09:53:02
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-09 09:58:00
 * @Desc: 全局状态 - store
 */
import tools from '@/utils/tools'

const state = {
  toAndFromRoutes: [],
  // 方向 forward = 向前；backward = 后退
  direction: 'forward',
  // 缓存的界面组件名
  cacheModules: ['classify'],
  // TODO: 暂时还不知道这个是干啥的
  enterPageNames: [],
  // 请求错误次数
  loadErrorCount: 0
}

const getters = {
  toAndFromRoutes(state) {
    return state.toAndFromRoutes
  }
}

const mutations = {
  setRoutes(state, routes) {
    state.toAndFromRoutes = routes
  },
  updateDirection(state, direction) {
    state.direction = direction
  },
  addCache(state, moduleName) {
    state.cacheModules.push(moduleName)
  },
  clearCache(state, moduleName) {
    console.log('-clear-cache-module-', moduleName)
  },
  setEnterPageName(state, newArr) {
    state.enterPageNames = newArr
  },
  setLoadErrorCount(state) {
    state.loadErrorCount++
  },
  clearLoadErrorCount(state) {
    state.loadErrorCount = 0
  }
}

const actions = {
  savePageName({ state, commit }, name) {
    const arr = tools.deepClone(state.enterPageName)
    if (name === 'payment' && arr[0] !== 'payment') {
      arr[0] = 'payment'
    }
    if (arr.length < 2) {
      arr.push(name)
    } else {
      arr.splice(1, 1, name)
    }
    console.log('-global-actions-arr-', arr)
    commit('setEnterPageName', arr)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
