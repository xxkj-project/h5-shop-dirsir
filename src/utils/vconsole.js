/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:24:56
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-19 14:57:19
 * @Desc: vconsole 调试工具 - 根据当前环境判断是否需要引入调试模块
 */

;(function() {
  // console.log('-env-', process.env.NODE_ENV)
  // 开发环境下关闭调试
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment) return
  // 生产环境下关闭调试
  const isOnLine = process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER_ENV === 'prod'
  if (isOnLine) return
  // 动态引入 Chunk分离
  import(/* webpackChunkName: "vconsole" */ 'vconsole').then(res => {
    let VConsole = res.default
    new VConsole()
  })
})()
