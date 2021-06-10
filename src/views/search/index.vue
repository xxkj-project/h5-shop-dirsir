<!--
 * @Author: wangshengxian
 * @Date: 2020-11-09 09:52:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-20 18:38:46
 * @Desc: 搜索页 - page
-->
<template>
  <div class="search-page">
    <searchBar @success="handleSearchSuccess" />

    <div class="main">
      <div class="searchWrap">
        <template v-if="historyList.length > 0">
          <div class="fx-space-between-center">
            <p class="listTitle">历史搜索</p>
            <span class="icon-delete" @click="onDeleteHistory"></span>
          </div>
          <ul class="searchList fx-wrap">
            <li v-for="(item, index) in historyList" :key="index" @click="onJumpResult(item)">
              {{ item }}
            </li>
          </ul>
        </template>
      </div>
      <div class="searchWrap">
        <p class="listTitle">搜索发现</p>
        <ul class="searchList fx-wrap">
          <li v-for="(item, index) in recommendData" :key="index" @click="onJumpResult(item.name)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from './components/searchBar'
import tools from '@/utils/tools'
import api from '@/api/searchs'
import goodsApi from '@/api/index'
export default {
  data() {
    return {
      // 搜索发现
      recommendData: [],
      // 历史记录
      historyList: []
    }
  },
  computed: {},
  components: { searchBar },

  mounted() {
    this.getRecommendData()
    this.getHistoryData()
  },
  methods: {
    // 跳转搜索结果页
    onJumpResult(data) {
      console.log('-data-', data)
      this.$router.push({
        path: '/searchResult',
        query: { keyword: data }
      })
    },
    handleSearchSuccess(data) {
      this.onJumpResult(data)
    },
    // 搜索发现
    getRecommendData() {
      this.$loading.show()
      goodsApi
        .getCategoryList()
        .then(res => {
          // console.log('-res-', res)
          this.$loading.hide()
          let data = res.data
          for (let i = 0; i < 7; i++) {
            let key = Math.floor(Math.random() * data.length)
            this.recommendData.push(data[key])
            data.splice(key, 1)
          }
        })
        .catch(err => {
          this.$loading.hide()
        })
    },
    // 历史记录
    getHistoryData() {
      api.getSearchRecord().then(res => {
        console.log('-history-res-', res)
        let data = res.data
        if (!data) return
        this.historyList = data.split(',').slice(0, 10)
        console.log('-history-list-', this.historyList)
      })
    },
    // 删除历史记录
    onDeleteHistory() {
      this.$dialog
        .confirm({
          title: '清除历史记录？'
        })
        .then(() => {
          this.$pageLoading.show('加载中...')
          api
            .deleteSearchRecord()
            .then(res => {
              console.log('-res-', res)
              this.$pageLoading.hide()
              this.historyList = []
              this.$toast('删除成功！')
            })
            .catch(err => {
              this.$pageLoading.hide()
            })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
@imgComUrl: '~@/assets/images/com/';
.search-page {
  width: 100%;
  background-color: #fff;
}

.searchWrap {
  width: 100%;
  padding: 10px 15px 0;

  .listTitle {
    color: #1a1a1a;
    font-size: 14px;
    line-height: 30px;
  }

  .searchList {
    width: 100%;
    padding-top: 10px;
    border-top: 1px solid #e7e7e7;

    li {
      font-size: 14px;
      color: #1a1a1a;
      padding: 5px 12px;
      border-radius: 2px;
      border: 1px solid #e6e6e6;
      margin: 0 10px 10px 0;
    }
  }

  .icon-delete {
    width: 16px;
    height: 18px;
    background: url('@{imgComUrl}icon-del.png') no-repeat center / cover;
  }
}
</style>
