<!--
 * @Author: wangshengxian
 * @Date: 2020-11-20 12:46:16
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-06 09:44:01
 * @Desc: 搜索结果 - page
-->
<template>
  <div class="result-page">
    <searchBar @success="handleSearchSuccess" />
    <div class="main">
      <template v-if="isShow">
        <div class="listBox">
          <van-list
            class="goodsList"
            v-model="isMoreLoading"
            :finished="isMoreFinished"
            :error.sync="isMoreError"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多了"
            :offset="300"
            :immediate-check="false"
            @load="getMoreData"
          >
            <itemCard :list="goodsList" />
          </van-list>
        </div>
      </template>
      <template v-else>
        <div class="noData">
          <p>未找到相关商品信息...</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import searchBar from './components/searchBar'
import itemCard from './components/itemCard'
import api from '@/api/searchs'
export default {
  name: '',
  data() {
    return {
      keyword: '',
      pageNum: 1,
      pageSize: 10,
      isMoreLoading: false,
      isMoreFinished: false,
      isMoreError: false,
      goodsList: []
    }
  },
  computed: {
    isShow() {
      return this.goodsList.length > 0
    }
  },
  components: {
    searchBar,
    itemCard
  },
  created() {
    this.keyword = this.$route.query.keyword
    this.getData()
  },
  mounted() {},
  methods: {
    handleSearchSuccess(data) {
      this.keyword = data
      this.pageNum = 1
      this.isMoreFinished = false
      this.isMoreError = false
      this.goodsList = []
      this.getData()
    },
    getData() {
      this.$loading.show()
      this.isMoreLoading = true
      const params = { keyword: this.keyword, pageNum: this.pageNum, pageSize: this.pageSize }
      console.log('-params-', params)
      api
        .getResultData(params)
        .then(res => {
          this.$loading.hide()
          this.isMoreLoading = false
          console.log('-res-', res)
          const { list, count } = res.data
          this.goodsList = list
          this.pageNum++
          if (this.goodsList.length >= count) {
            console.log('全部加载完成')
            this.isMoreFinished = true
          }
        })
        .catch(err => {
          this.$loading.hide()
          this.isMoreLoading = false
          this.isMoreError = true
        })
    },
    getMoreData() {
      this.isMoreLoading = true
      const params = { keyword: this.keyword, pageNum: this.pageNum, pageSize: this.pageSize }
      console.log('-params-', params)
      api
        .getResultData(params)
        .then(res => {
          this.isMoreLoading = false
          console.log('-res-', res)
          const { list, count } = res.data
          this.goodsList = [...this.goodsList, ...list]
          this.pageNum++
          if (this.goodsList.length >= count) {
            console.log('全部加载完成')
            this.isMoreFinished = true
          }
        })
        .catch(err => {
          this.isMoreLoading = false
          this.isMoreError = true
        })
    }
  }
}
</script>

<style lang="less" scoped>
.result-page {
  .main {
    padding: 15px 15px 0;
  }

  .noData {
    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      color: #999;
      font-size: 18px;
    }
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
