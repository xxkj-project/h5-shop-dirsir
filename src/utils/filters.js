/*
 * @Author: wangshengxian
 * @Date: 2020-11-13 13:47:20
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-26 10:34:25
 * @Desc: 全局过滤器
 */
import Vue from 'vue'

Vue.filter('price', function(val) {
  if (!val) return '0'
  return '￥' + val
})

// Vue.filter('fmtlevel', (distance, rag) => {
//   if (distance >= 1000) {
//     var level = distance / 1000
//     return level.toFixed(1) + ' km'
//   } else {
//     return distance + ' m'
//   }
// })

// Vue.filter('getW', number => {
//   if (number >= 10000) {
//     return (number / 10000).toFixed(1) + 'W'
//   } else {
//     return number
//   }
// })

// Vue.filter('getLess', (locale, full, discount) => {
//   switch (locale) {
//     case 'cn':
//       return `满 ${full} 减 ${discount}`
//     case 'en':
//       return `buy ${full} discount ${discount}`
//   }
// })

// Vue.filter('getDisCount', (locale, sale) => {
//   switch (locale) {
//     case 'cn':
//       return `优惠 ${sale} 折`
//     case 'en':
//       return `${sale * 10} % off`
//   }
// })

// // 百分比换算
// Vue.filter('rate', n => {
//   return (n * 100).toFixed(2)
// })

// // 价格
// Vue.filter('price', x => {
//   var f = Math.round(x * 100) / 100
//   var s = f.toString()
//   return s
// })

// // 销量
// Vue.filter('saleNumber', (locale, n) => {
//   if (n > 999) {
//     n = '999+'
//   }
//   switch (locale) {
//     case 'cn':
//       return `已售 ${n} 件`
//     case 'en':
//       return `Sale ${n}`
//   }
// })

// // 共1件商品
// Vue.filter('orderSaleNumber', (locale, n) => {
//   switch (locale) {
//     case 'cn':
//       return `共${n}件商品`
//     case 'en':
//       return `${n} products.`
//   }
// })

// // n秒后自动跳转全部订单页面

// Vue.filter('jumpOrder', (locale, n) => {
//   switch (locale) {
//     case 'cn':
//       return `${n}秒后自动跳转全部订单页面`
//     case 'en':
//       return `Automatically jump to all order pages after ${n} seconds`
//   }
// })
