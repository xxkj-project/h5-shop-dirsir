/*
 * @Author: wangshengxian
 * @Date: 2020-10-19 15:58:13
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-08 09:59:11
 * @Desc: 首页headerConfig - 滑动后改变标题栏的显示状态
 */
export default {
  data() {
    return {
      headConfig: {
        arrowsType: 'white', // 返回键type (white/black)
        titleOpacity: 0, // 标题透明度
        bgColor: 'rgba(255,255,255,0)', // 背景色
        inputBgColor: 'rgba(255,255,255, 1)' // 搜索框背景色
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(e) {
      let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      // console.log("-top-",top)
      if (top < 10) {
        this.headConfig.arrowsType = 'white'
        this.headConfig.titleOpacity = 0
        this.headConfig.bgColor = `rgba(255,255,255,0)`
        this.headConfig.inputBgColor = 'rgba(255,255,255, 1)'
        return
      }
      if (top > 200) {
        this.headConfig.titleOpacity = 1
        this.headConfig.bgColor = `rgba(255, 255, 255, 1)`
        this.headConfig.inputBgColor = 'rgba(240,241,243, 1)'
        return
      }
      // console.log(top)
      this.headConfig.arrowsType = 'black'
      this.headConfig.titleOpacity = top / 150
      this.headConfig.bgColor = `rgba(255, 255, 255, ${top / 150})`
      this.headConfig.inputBgColor = `rgba(240,241,243, ${top / 150})`
    }
  }
}
