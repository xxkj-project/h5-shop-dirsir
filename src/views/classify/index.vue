<!--
 * @Author: wangshengxian
 * @Date: 2020-10-25 22:44:59
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-15 13:49:55
 * @Desc: 分类页 - page
-->
<template>
  <div class="classify-page fx-column">
    <searchBar />

    <div class="main flex1">
      <div class="container">
        <van-tabs
          v-model="activeIdx"
          :swipe-threshold="4"
          sticky
          :offset-top="offsetTop"
          background="#fff"
          title-active-color="rgba(0,0,0,1)"
          title-inactive-color="rgba(0,0,0,0.6)"
          :line-width="30 / remBase + 'rem'"
          :line-height="3 / remBase + 'rem'"
          @change="onTabsChange"
        >
          <van-tab
            class="content"
            v-for="(itemOptions, index) in categoryList"
            :key="index"
            :title="itemOptions.name"
            :name="itemOptions.id"
          >
            <ul class="nextCategory">
              <li class="itemWrap" v-for="(item, idx) in secondCategoryList" :key="idx">
                <div class="item" @click="onJumpPage(item)">
                  <img class="backgroundImg" :src="item.backgroundImage" alt="" />
                  <div class="iconImgBox">
                    <img :src="item.icon" alt="" class="iconImg" />
                  </div>
                </div>
              </li>
            </ul>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from '@/components/searchBar'
import api from '@/api/index'
import { mapState } from 'vuex'
import storage from '@/utils/storage'
export default {
  name: '',
  data() {
    return {
      remBase: '41.4',
      activeIdx: 1, // 激活的当前tabIdx
      categoryId: '', // 当前分类id
      secondCategoryList: [], // 当前二级分类list
      totalData: {} // 总的二级分类数据
    }
  },
  computed: {
    ...mapState('goods', ['categoryList']),
    ...mapState('app', ['statusBarHeight']),
    offsetTop() {
      // 54 为headerBar标题的高度
      console.log('-bar-height-')
      let result = +this.statusBarHeight + 54
      return result / this.remBase + 'rem'
    }
  },
  created() {
    const actIdx = storage.getItem('category_activeidx')
    if (actIdx) {
      this.categoryId = actIdx
      this.activeIdx = +actIdx
    } else {
      const { classifyId } = this.$route.query
      console.log(classifyId)
      this.categoryId = classifyId
      this.activeIdx = +classifyId
    }
    this.getInit()
  },
  mounted() {
    // TODO: 前往商品页需要记住当前的分类id
    this.$nextTick(() => {
      console.log('-classify-', this.categoryList)
    })
  },
  methods: {
    setScollTop() {
      const el = document.querySelector('.container')
      console.log(el, el.scrollTop)
    },
    onJumpPage(item) {
      console.log('-item-', item)
      this.$router.push({ name: 'ClassifyList', query: { id: item.id, title: item.name } })
    },
    // 一级分类
    onTabsChange(id) {
      console.log('-id-', id)
      // this.setScollTop()
      console.log(this.activeIdx)
      storage.setItem('category_activeidx', id)
      this.categoryId = id
      console.log('-curr-list-', this.totalData[id])
      if (this.totalData[id]) {
        this.secondCategoryList = this.totalData[id]
        return
      }
      this.getCategoryData()
    },
    // 初始化
    getInit() {
      this.$loading.show()
      const params = { id: this.categoryId }
      console.log('-params-', params)
      api
        .getNextCategory(params)
        .then(res => {
          this.$loading.hide()
          console.log('-res-', res)
          const data = res.data
          this.secondCategoryList = data
          this.totalData[this.categoryId] = data
          // console.log('-total-data-', this.totalData)
        })
        .catch(err => {
          this.$loading.hide()
        })
    },
    getCategoryData() {
      this.$pageLoading.show('加载中...')
      const params = { id: this.categoryId }
      console.log('-params-', params)
      api
        .getNextCategory(params)
        .then(res => {
          this.$pageLoading.hide()
          console.log('-res-', res)
          const data = res.data
          this.secondCategoryList = data
          this.totalData[this.categoryId] = data
          // console.log('-total-data-', this.totalData)
        })
        .catch(err => {
          this.$pageLoading.hide()
        })
    }
  },
  components: { searchBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgComUrl: '~@/assets/images/com/';

/deep/ .header-global {
  .leftIcon {
    width: 12px;
    height: 20px;
    background: url('@{imgComUrl}icon-left-arrow3.png') no-repeat center / cover;
  }

  .icon {
    background: url('@{imgComUrl}icon-cart2.png') no-repeat center / cover;
  }
}

.classify-page {
  .main {
    /deep/ .van-tabs__wrap--scrollable {
      .van-tabs__nav--complete {
        padding: 0 0 15px;
      }
    }
  }

  .container {
    // height: 100%;
    // overflow-y: auto;
    // -webkit-overflow-scrolling: touch;
  }

  .content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #f9fafc;
  }
}

.nextCategory {
  padding: 16px 15px;

  .item {
    position: relative;
    margin-bottom: 16px;
    .backgroundImg {
      display: block;
      width: 100%;
      height: 146px;
      border-radius: 10px;
    }
    .iconImgBox {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding-left: 60px;

      .iconImg {
        transform: scale(0.5);
        transform-origin: left center;
      }
    }
  }
}
</style>
