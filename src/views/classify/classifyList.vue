<!--
 * @Author: wangshengxian
 * @Date: 2020-11-24 18:04:03
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-04 11:25:27
 * @Desc: 分类商品页 - page
-->
<template>
  <div class="classify-list-page">
    <headerBar :headTitle="title" />
    <div class="main">
      <div class="content">
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
            <goodsList :list="goodsList" />
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import goodsList from './components/goodsList'
import api from '@/api'
export default {
  name: '',
  data() {
    return {
      id: '',
      title: '',
      pageNum: 1,
      pageSize: 10,
      isMoreLoading: false,
      isMoreFinished: false,
      isMoreError: false,
      goodsList: []
    }
  },
  computed: {},
  created() {
    const { id, title } = this.$route.query
    this.id = id
    this.title = title
    this.setTitle(title)
    this.getData()
  },
  mounted() {},
  methods: {
    setTitle(title) {
      document.title = title
    },
    getData() {
      const params = { id: this.id, pageNum: this.pageNum, pageSize: this.pageSize }
      console.log('-params-', params)
      this.$loading.show()
      this.isMoreLoading = true
      api
        .getCategoryGoods(params)
        .then(res => {
          console.log('-res--', res)
          this.isMoreLoading = false
          this.$loading.hide()
          const { result, totalCount } = res.data
          this.goodsList = result
          this.pageNum++
          console.log('-list-', this.goodsList)
          if (this.goodsList.length >= totalCount) {
            console.log('全部加载完成')
            this.isMoreFinished = true
          }
        })
        .catch(err => {
          console.log('-HOME-ERROR-', err)
          this.$loading.hide()
          this.isMoreError = true
        })
    },
    getMoreData() {
      console.log('-加载更多-')
      this.isMoreLoading = true
      const params = { id: this.id, pageNum: this.pageNum, pageSize: this.pageSize }
      console.log('-params-', params)
      api
        .getCategoryGoods(params)
        .then(res => {
          this.isMoreLoading = false
          console.log('-res--', res)
          const { result, totalCount } = res.data
          this.goodsList = [...this.goodsList, ...result]
          this.pageNum++
          if (this.goodsList.length >= totalCount) {
            console.log('全部加载完成')
            this.isMoreFinished = true
          }
        })
        .catch(err => {
          console.log('-ERROR-', err)
          this.isMoreError = true
        })
    }
  },
  components: { headerBar, goodsList }
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

.classify-list-page {
  // height: 100%;
  // background: #ccc;

  .content {
    padding: 15px 15px 0;
  }
}
</style>
