/*
 * @Author: wangshengxian
 * @Date: 2020-10-19 15:58:13
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-30 12:49:40
 * @Desc: 首页headerConfig - 滑动后改变标题栏的显示状态
 */
export default {
  data() {
    return {
      headConfig: {
        bgColor: `rgba(255,255,255,0)`,
        opacity: '0'
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
      if (top < 10) {
        this.headConfig.opacity = '0'
        // this.headConfig.bgColor = `rgba(255,255,255,0)`
        return
      }
      if (top > 100) {
        this.headConfig.opacity = '1'
        // this.headConfig.bgColor = `rgba(255, 255, 255, 1)`
        return
      }
      // console.log(top)
      this.headConfig.opacity = `${top / 100}`
      // this.headConfig.bgColor = `rgba(255, 255, 255, ${top / 150})`
    }
  }
}
