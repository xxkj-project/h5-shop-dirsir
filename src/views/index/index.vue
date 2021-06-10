<!--
 * @Author: wangshengxian
 * @Date: 2020-10-19 15:35:17
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-06 09:38:31
 * @Desc: 商城首页
-->
<template>
  <div class="index">
    <searchBar
      :onBack="handleBack"
      :isMainFullScreen="true"
      :background="headConfig.bgColor"
      :arrowsType="headConfig.arrowsType"
      :titleOpacity="headConfig.titleOpacity"
      :searchInputBgColor="headConfig.inputBgColor"
    />
    <div class="main">
      <div class="topBg"></div>

      <div class="content">
        <div class="navWrap">
          <div class="navContent">
            <ul class="navList">
              <li class="item" v-for="(item, index) in categoryList" :key="index" @click="onNav(item)">
                <span class="itemIcon" :class="'icon' + '_' + index"></span>
                <p>{{ item.name }}</p>
              </li>
            </ul>
            <div class="explainTabBox">
              <div class="tabItem" @click="onTab('1')">
                <span class="icon-1-1"></span>
                <p class="txt">关于我们</p>
                <span class="icon-arrow"></span>
              </div>
              <div class="tabItem" @click="onTab('2')">
                <span class="icon-2-1"></span>
                <p class="txt">购买须知</p>
                <span class="icon-arrow"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="listWrap">
          <div class="titleBox">
            <p class="title">为你推荐</p>
            <p class="btnTxt" @click="onOpenPage">查看全部<span class="icon"></span></p>
          </div>

          <div class="listBox">
            <van-list
              v-model="isMoreLoading"
              :finished="isMoreFinished"
              :error.sync="isMoreError"
              error-text="请求失败，点击重新加载"
              finished-text="没有更多了"
              :offset="300"
              :immediate-check="false"
              @load="getMoreData"
            >
              <goodsList :list="recommendList" />
            </van-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from '@/components/searchBar'
import goodsList from './components/goodsList'
import homeHeaderMixins from './mixins/headerConfig'
import api from '@/api/index'
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
import storage from '@/utils/storage'
import wx from 'weixin-js-sdk'
export default {
  name: '',
  mixins: [homeHeaderMixins],
  inject: ['reload'],
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      isMoreLoading: false,
      isMoreFinished: false,
      isMoreError: false,
      recommendList: []
    }
  },
  computed: {
    ...mapState('user', ['key']),
    ...mapState('goods', ['categoryList']),
    ...mapState('global', ['loadErrorCount'])
  },
  created() {
    this.setStorageCode()
    this.getCartNumData()
    this.getCategoryData()
    this.getData()
  },
  mounted() {
    console.log('-wx-', wx)
  },
  methods: {
    // 设置渠道码code存储(存储有效时间为 3 天)
    setStorageCode() {
      const { code } = this.$route.params
      console.log('-code-', code)
      Cookie.set('code', code, { expires: 3 })
      this.$store.commit('user/setCode', code)
    },
    // 获取购物车数
    getCartNumData() {
      let key = Cookie.get('key')
      console.log('-key-', key)
      if (!key) {
        // key过期了，购物车数存储还存在的话，需要手动清除
        if (Cookie.get('cart_num')) {
          Cookie.remove('cart_num')
          this.$store.commit('cart/setCartNum', 0)
        }
        return
      }
      this.$store.dispatch('cart/getCartNum')
    },
    // 获取一级分类list
    getCategoryData() {
      this.$store.dispatch('goods/getCategoryList')
    },
    handleBack() {
      console.log('当前为首页')
    },
    onNav(item) {
      console.log('-item-', item)
      if (storage.getItem('category_activeidx')) {
        storage.removeItem('category_activeidx')
      }
      this.$router.push({ name: 'Classify', query: { classifyId: item.id } })
    },
    onTab(type) {
      let pathName = type === '1' ? 'AboutUs' : 'BuyNotes'
      this.$router.push({ name: pathName })
    },
    onOpenPage() {
      if (storage.getItem('category_activeidx')) {
        storage.removeItem('category_activeidx')
      }
      this.$router.push({ name: 'Classify', query: { classifyId: this.categoryList[0].id } })
    },

    getData() {
      this.$loading.show()
      this.isMoreLoading = true
      const params = { pageNum: this.pageNum, pageSize: this.pageSize }
      console.log('-init-params-', params)
      api
        .getRecommendList(params)
        .then(res => {
          this.$loading.hide()
          this.isMoreLoading = false
          console.log('-res--', res)
          const { result, totalCount } = res.data
          this.recommendList = result
          this.pageNum++
          if (this.recommendList.length >= totalCount) {
            console.log('全部加载完成')
            this.isMoreFinished = true
          }
        })
        .catch(err => {
          console.log('-HOME-ERROR-', err)
          this.$loading.hide()
          this.isMoreLoading = false
          this.isMoreError = true
          // this.handleErrorRes(err)
        })
    },
    getMoreData() {
      this.isMoreLoading = true
      const params = { pageNum: this.pageNum, pageSize: this.pageSize }
      console.log('-more-params-', params)
      api
        .getRecommendList(params)
        .then(res => {
          this.isMoreLoading = false
          console.log('-res--', res)
          const { result, totalCount } = res.data
          this.recommendList = [...this.recommendList, ...result]
          this.pageNum++
          if (this.recommendList.length >= totalCount) {
            console.log('全部加载完成')
            this.isMoreFinished = true
          }
        })
        .catch(err => {
          console.log('-HOME-ERROR-', err)
          this.isMoreLoading = false
          this.isMoreError = true
        })
    },
    // 请求失败/超时(app内嵌h5的时候可以用该方法处理请求错误)
    handleErrorRes(error) {
      this.$dialog
        .confirm({
          title: '服务器开小差了!',
          message: error.message,
          cancelButtonText: '返回',
          confirmButtonText: '重新加载'
        })
        .then(() => {
          this.$store.commit('global/setLoadErrorCount')
          console.log('-load-count-', this.loadErrorCount)
          if (this.loadErrorCount > 3) {
            this.$toast({
              message: '服务器开小差了，请稍后再重试!'
            })
            return
          }
          this.reload() // 刷新当前页
        })
        .catch(() => {})
    }
  },
  components: { searchBar, goodsList }
}
</script>
<style lang="less" scoped>
@imgUrl: '~@/assets/images/home/';
@imgComUrl: '~@/assets/images/com/';
.index {
  width: 100%;
  background: #f9fafc;

  .content {
    padding: 0 15px;
  }
}
.topBg {
  width: 100%;
  height: 293px;
  background: url('@{imgUrl}topBg.png') no-repeat center / cover;
}
.navWrap {
  position: relative;
  width: 100%;
  height: 114px;

  .navContent {
    position: absolute;
    bottom: 0;
    width: 100%;

    .navList {
      display: flex;
      background: #fff;
      // border-radius: 10px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 20%;
        padding-top: 31px;

        .itemIcon {
          width: 36px;
          height: 36px;

          &.icon_0 {
            background: url('@{imgUrl}icon-classify3.png') no-repeat center / cover;
          }
          &.icon_1 {
            background: url('@{imgUrl}icon-classify4.png') no-repeat center / cover;
          }
          &.icon_2 {
            background: url('@{imgUrl}icon-classify5.png') no-repeat center / cover;
          }
          &.icon_3 {
            background: url('@{imgUrl}icon-classify1.png') no-repeat center / cover;
          }
          &.icon_4 {
            background: url('@{imgUrl}icon-classify2.png') no-repeat center / cover;
          }
        }

        p {
          color: #b1b2b7;
          font-size: 15px;
          line-height: 21px;
          padding: 13px 0;
        }
      }
    }

    .explainTabBox {
      display: flex;
      overflow: hidden;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;

      .tabItem {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        background: #fff;
        line-height: 48px;
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }

        .txt {
          font-size: 16px;
          color: #292929;
          padding: 0 16px 0 8px;
        }

        .icon-1-1 {
          width: 21px;
          height: 21px;
          background: url('@{imgUrl}icon-about-us.png') no-repeat center / cover;
        }

        .icon-2-1 {
          width: 18px;
          height: 22px;
          background: url('@{imgUrl}icon-buy-notes.png') no-repeat center / cover;
        }

        .icon-arrow {
          width: 12px;
          height: 9px;
          background: url('@{imgUrl}icon-right-arrow1.png') no-repeat center / cover;
        }
      }
    }
  }
}

.listWrap {
  .titleBox {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;

    p {
      display: flex;
      align-items: center;
    }

    .title {
      font-size: 18px;
      font-weight: 800;
      color: #292929;
    }

    .btnTxt {
      font-size: 14px;
      color: #d2d4d9;

      .icon {
        width: 7px;
        height: 12px;
        background: url('@{imgComUrl}icon-right-arrow.png') no-repeat center / cover;
        margin-left: 8px;
      }
    }
  }
  .listBox {
    padding-bottom: 24px;
  }
}

/deep/ .van-list {
  .van-list__finished-text {
    width: 100%;
  }
  .van-list__error-text {
    width: 100%;
  }
  .van-list__loading {
    width: 100%;
  }
}
</style>
