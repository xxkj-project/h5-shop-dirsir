/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:24:55
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-29 11:32:50
 * @Desc: rem适配方案
 */

;(function(window, document) {
  // var sizeUI = 750 // 定义设计图尺寸
  // var remBase = 75 // 定义基准值
  // var sizeUI = 375 // 定义设计图尺寸
  // var remBase = 37.5 // 定义基准值
  var sizeUI = 414 // 定义设计图尺寸
  var remBase = 41.4 // 定义基准值
  var docEl = document.documentElement
  var bodyEl = document.querySelector('body')

  setRemUnit()
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) setRemUnit()
  })
  function setRemUnit() {
    // console.log(docEl.clientWidth)
    var docFontSize = (docEl.clientWidth / sizeUI) * remBase
    // console.log('-html-size-', docFontSize)
    docEl.style.fontSize = docFontSize + 'px'
    bodyEl.style.fontSize = 12 / docFontSize + 'rem'
  }
})(window, document)
