/*
 * @Author: wangshengxian
 * @Date: 2020-12-16 16:04:48
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-16 16:05:30
 * @Desc:
 */
import wx from 'weixin-js-sdk'

wx.ready(function() {
  //分享给朋友
  wx.onMenuShareTimeline({
    title: '测试分享朋友',
    desc: '分享使我快乐', // 分享描述
    link: 'https://api.tangseng.io/livemember/download', // 分享地址
    imgUrl: 'https://fileup.ickapay.com/file/imgOneVideo4/3/28f1e135d87941f8a59dcc3d5d81c7c4.jpg', // 分享显示的缩略图地址, 根据自己情况而定
    success: function() {
      // 分享成功可以做相应的数据处理
      console.log('-调用微信分享朋友功能-')
      alert('分享成功')
    }
  })
  wx.onMenuShareAppMessage({
    title: '测试分享朋友圈',
    desc: '分享使我快乐', // 分享描述
    link: 'https://api.tangseng.io/livemember/download', // 分享地址
    imgUrl: 'https://fileup.ickapay.com/file/imgOneVideo4/3/28f1e135d87941f8a59dcc3d5d81c7c4.jpg', // 分享显示的缩略图地址, 根据自己情况而定
    success: function() {
      // 分享成功可以做相应的数据处理
      console.log('-调用微信分享朋友圈功能-')
      alert('分享成功')
    }
  })
})
