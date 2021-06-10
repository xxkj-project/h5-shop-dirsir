<!--
 * @Author: wangshengxian
 * @Date: 2020-10-28 14:21:43
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-06 09:46:08
 * @Desc: 收货地址
-->
<template>
  <div class="address-page fx-column">
    <headerBar />
    <div class="main flex1">
      <template v-if="!isNoData">
        <van-list
          class="listBox"
          v-model="isMoreLoading"
          :finished="isMoreFinished"
          finished-text="没有更多了"
          :error.sync="isMoreError"
          error-text="加载失败，点击重新加载"
          offset="100"
          @load="getMoreData"
          :immediate-check="false"
        >
          <div
            class="item"
            :style="{ minHeight: minItemHeight }"
            v-for="(item, index) in addressList"
            :key="index"
            @click="onChecked(item)"
          >
            <div class="top fx-space-between-center">
              <p>{{ item.name }}</p>
              <p>{{ item.mobile }}</p>
            </div>
            <div class="center">
              <p>{{ item.addressTxt }}</p>
            </div>
            <div class="bottom fx-space-between-center">
              <p class="left fx-align-center" @click.stop="onSelect(item, index)">
                <span class="icon" :class="item.defaultAddress ? 'icon-select' : 'icon-no-select'"></span>默认
              </p>
              <p class="right fx-align-center" @click.stop="onDelete(item, index)">
                <span class="icon icon-delete"></span>删除
              </p>
            </div>
          </div>
        </van-list>
      </template>
      <template v-else>
        <noData />
      </template>
    </div>
    <div class="footerWrap">
      <div class="footerContent fx-center" @click="onAdd">
        <p>新建地址</p>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import noData from '@/components/noData'
import api from '@/api/address'
import storage from '@/utils/storage'
export default {
  name: '',
  data() {
    return {
      pageNum: 1,
      pageSize: 6,
      isMoreLoading: false,
      isMoreFinished: false,
      isMoreError: false,
      addressList: []
    }
  },
  computed: {
    minItemHeight() {
      // 414 基准值为 163px
      let result = (window.innerWidth / 414) * 163 + 'px'
      return result
    },
    isNoData() {
      return this.addressList.length === 0
    },
    isClickSelect() {
      return !!this.$route.query.type
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    initData() {
      this.isMoreFinished = false
      this.isMoreError = false
      this.pageNum = 1
    },
    onChecked(item) {
      if (this.isClickSelect) {
        storage.setItem('confirm_address', item)
        this.$router.go(-1)
      }
    },
    onSelect(item, index) {
      // console.log('-item-', item, index)
      if (item.defaultAddress) return
      const params = { defaultAddress: true, id: item.id }
      api.setDefaultAddress(params).then(res => {
        console.log('-res-', res)
        this.initData()
        this.getData(false)
        // TODO: 此处可以用js数组方法来操作，可以不用做请求,后期优化处理
        // this.addressList.splice(index, 1)
        // this.addressList.unshift(item)
      })
    },
    onDelete(item, index) {
      console.log('-item-', item, '-index-', index)
      this.$dialog
        .confirm({
          title: '提示！',
          message: '是否确认删除当前地址?',
          closeOnClickOverlay: true,
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              const params = { id: item.id }
              api.delAddress(params).then(res => {
                // console.log('-res-', res)
                setTimeout(() => {
                  // this.addressList.splice(index, 1)
                  let storageAddress = storage.getItem('confirm_address')
                  console.log(storageAddress)
                  if (storageAddress && storageAddress.id == item.id) {
                    storage.removeItem('confirm_address')
                  }
                  this.$toast('删除成功!')
                  this.initData()
                  this.getData(false)
                  done()
                }, 300)
              })
            } else {
              done()
            }
          }
        })
        .then(() => {})
        .catch(() => {})
    },
    onAdd() {
      this.$router.push({ name: 'AddAddress' })
    },
    getData(isInit = true) {
      let loading = isInit ? this.$loading : this.$pageLoading
      let text = isInit ? '' : '加载中...'
      loading.show(text)
      this.isMoreLoading = true
      const params = { pageNum: this.pageNum, pageSize: this.pageSize }
      api
        .getAddressList(params)
        .then(res => {
          loading.hide()
          this.isMoreLoading = false
          // console.log('-res-', res)
          const { count, list } = res.data
          this.addressList = this.setListData(list)
          // console.log('-list-', this.addressList)
          this.pageNum++
          if (this.addressList.length >= count) {
            this.isMoreFinished = true
          }
        })
        .catch(err => {
          loading.hide()
          this.isMoreLoading = false
          this.isMoreError = true
          this.$toast(err.msg)
        })
    },
    // 加载更多
    getMoreData() {
      this.isMoreLoading = true
      const params = { pageNum: this.pageNum, pageSize: this.pageSize }
      api
        .getAddressList(params)
        .then(res => {
          this.isMoreLoading = false
          // console.log('-res-', res)
          const { count, list } = res.data
          this.addressList = [...this.addressList, ...this.setListData(list)]
          // console.log('-more-list-', this.addressList)
          this.pageNum++
          if (this.addressList.length >= count) {
            this.isMoreFinished = true
          }
        })
        .catch(err => {
          this.isMoreLoading = false
          this.isMoreError = true
          this.$toast(err.msg)
        })
    },
    setListData(list) {
      let result = []
      list.map(val => {
        let mid = {}
        let addressTxt = `${val.province}${val.city}${val.detailAddress}`
        mid = { addressTxt, ...val }
        result.push(mid)
      })
      return result
    }
  },
  components: { headerBar, noData }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgComUrl: '~@/assets/images/com/';

.address-page {
  background: #f9fafc;
  // background: #ccc;

  .main {
    padding-bottom: 60px;
  }
}

.listBox {
  padding: 15px 15px 0;

  .item {
    background: #fff;
    border-radius: 10px;
    padding: 24px 15px;
    margin-bottom: 15px;

    .top {
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
    }

    .center {
      color: #b1b2b7;
      font-size: 16px;
      line-height: 28px;
      padding: 16px 0;
      border-bottom: 1px solid #efeff1;
    }

    .bottom {
      padding-top: 16px;
      font-size: 14px;
      color: #b1b2b7;

      .icon {
        width: 18px;
        height: 18px;
        margin-right: 8px;

        &.icon-select {
          background: url('@{imgComUrl}icon-checked.png') no-repeat center / cover;
        }
        &.icon-no-select {
          background: url('@{imgComUrl}icon-no-checked.png') no-repeat center / cover;
        }
        &.icon-delete {
          width: 16px;
          background: url('@{imgComUrl}icon-del.png') no-repeat center / cover;
        }
      }
    }
  }
}

.footerWrap {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 60px;
  background: #fff;
  padding: 6px 15px;

  .footerContent {
    height: 48px;
    color: #5fc0a3;
    font-size: 16px;
    border: 1px solid #5fc0a3;
    border-radius: 28px;
  }
}
</style>
