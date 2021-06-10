<!--
 * @Author: wangshengxian
 * @Date: 2020-11-18 13:31:29
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-09 14:03:12
 * @Desc: 购物车 - page
-->

<template>
  <div class="cart-page">
    <headerBar>
      <p @click="onEdit">{{ headerBtnTxt }}</p>
    </headerBar>
    <div class="main">
      <template v-if="list.length > 0">
        <van-list
          v-model="isMoreLoading"
          :finished="isMoreFinished"
          finished-text="没有更多了"
          :error.sync="isMoreError"
          error-text="加载失败，点击重新加载"
          @load="getMoreData"
          :immediate-check="false"
        >
          <div class="itemBox fx-align-center" v-for="(item, index) in list" :key="index">
            <div class="left" @click="onChecked(item, index)">
              <span class="circle" :class="{ activeIcon: item.status }"></span>
            </div>
            <div class="right flexbox flex1" @click="onDetails(item)">
              <div class="imgBox fx-center">
                <img class="img" v-lazy="item.productImage" alt="" />
              </div>
              <div class="descBox fx-column-space-between flex1">
                <div class="top">
                  <p class="title">{{ item.productTitle }}</p>
                  <p class="desc">{{ item.specName }}</p>
                </div>
                <div class="bottom fx-space-between-center">
                  <span class="price">{{ item.unitPrice | price }}</span>
                  <div class="num fx-center">
                    <span class="icon icon-sub fx-center" @click.stop="onSub(item, index)"></span>
                    <p>{{ item.purchaseQuantity }}</p>
                    <span class="icon icon-add fx-center" @click.stop="onAdd(item, index)"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </template>
      <template v-else>
        <no-data />
      </template>
    </div>
    <div class="footerWrap">
      <div class="footerContent fx-space-between-center">
        <div class="left fx-center" @click="onCheckedAll">
          <span class="circle" :class="{ activeIcon: isAllSel }"></span>
          <p>全选</p>
        </div>
        <div class="right fx-center" v-show="isEditBtn">
          <p>合计:</p>
          <p class="price">{{ totalPrice | price }}</p>
          <van-button type="info" round @click="onSubmit">结算{{ selTotalCount | filterBtnTxt }}</van-button>
        </div>
        <div class="right" v-show="!isEditBtn">
          <van-button type="primary" round plain hairline @click="onDel">删除商品</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import noData from '@/components/noData'
import jsPrecision from '@/utils/jsPrecision' // js精度处理模块
import api from '@/api/cart'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      pageNo: 0,
      pageSize: 10,
      isMoreLoading: false,
      isMoreFinished: true, // 购物车当前没有做分页
      isMoreError: false,
      list: [],
      isAllSel: false, // 是否全选
      isEditBtn: true, // 是否为编辑按钮
      selTotalCount: 0, // 选择的商品数量，默认为 0
      totalPrice: 0, // 合计
      cartIds: [] // 选中的cartId集合
    }
  },
  computed: {
    ...mapState('cart', ['cartNum']),
    headerBtnTxt() {
      return this.isEditBtn ? '编辑' : '完成'
    }
  },
  filters: {
    filterBtnTxt(val) {
      return val === 0 ? '' : `(${val})`
    }
  },
  components: { headerBar, noData },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    onEdit() {
      this.isEditBtn = !this.isEditBtn
    },
    // 单选
    onChecked(item, index) {
      console.log('-checked-', item, index)
      item.status = !item.status

      let result = this.list.filter(val => !val.status)
      this.isAllSel = result.length === 0

      if (item.status) {
        // 选中
        this.totalPrice = jsPrecision.add(this.totalPrice, item.totalPrice)
        this.selTotalCount++
        this.cartIds.push(item.cartItemId)
      } else {
        // 取消
        this.totalPrice = jsPrecision.sub(this.totalPrice, item.totalPrice)
        this.selTotalCount--
        let idx = this.cartIds.indexOf(item.cartItemId)
        this.cartIds.splice(idx, 1)
      }
    },
    // 全选
    onCheckedAll() {
      console.log('-checked-all-', this.isAllSel)
      this.isAllSel = !this.isAllSel
      if (this.isAllSel) {
        this.selTotalCount = this.list.length
        this.totalPrice = this.computedTotalPrice(this.list)
        this.cartIds = this.setCartIds()
      } else {
        this.selTotalCount = 0
        this.totalPrice = 0
        this.cartIds = []
      }
      this.list.map(val => {
        val.status = this.isAllSel
        return val
      })
    },

    // 结算
    onSubmit() {
      if (this.selTotalCount === 0) {
        this.$toast('请选择商品')
        return
      }
      console.log('-ids-', this.cartIds, '-price-', this.list)

      let result = []
      this.list.map(val => {
        if (this.cartIds.includes(val.cartItemId)) {
          let mid = {}
          mid = { cartItemId: val.cartItemId, quantity: val.purchaseQuantity, remark: '', skuId: val.skuId }
          result.push(mid)
        }
      })
      console.log('-query-skus-', result)
      this.$router.push({ name: 'ConfirmOrder', query: { skus: JSON.stringify(result), fromRouteName: 'Cart' } })
    },
    // 删除
    onDel() {
      if (this.selTotalCount === 0) {
        this.$toast('请选择商品')
        return
      }
      console.log('-del-ids-', this.cartIds)
      const params = { cartItemIds: this.cartIds.toString() }
      console.log('-params-', params)
      api.deleteCart(params).then(res => {
        // console.log('-res-', res)
        this.$toast('删除成功!')
        // console.log('-cart-num-', this.cartNum)
        this.$store.dispatch('cart/getCartNum', this.cartNum - this.cartIds.length)
        this.list = this.list.filter(val => !this.cartIds.includes(val.cartItemId))
      })
    },
    onDetails(item) {
      console.log('-item-', item)
      this.$router.push({ path: '/goodsDetails', query: { id: item.productId } })
    },
    // TODO: 需要加一个节流来防止用户快速多次点击
    onSub(item, index) {
      console.log('-sub-', item, index)
      if (item.purchaseQuantity <= 1) {
        this.$toast('该商品不能再减少了！')
        return
      }
      let quantity = item.purchaseQuantity - 1
      this.editCartReq('sub', item, quantity)
    },
    // TODO: 需要加一个节流来防止用户快速多次点击
    onAdd(item, index) {
      // TODO: 后期需要加一个超限购买提示
      console.log('-item-', item, index)
      let quantity = item.purchaseQuantity + 1
      this.editCartReq('add', item, quantity)
    },
    // 设置全选 cartId 集合
    setCartIds() {
      let result = []
      this.list.map(val => {
        result.push(val.cartItemId)
      })
      return result
    },
    // 全选价格计算
    computedTotalPrice(list) {
      let result = list.reduce((pre, cur) => jsPrecision.add(pre, cur.totalPrice), 0)
      return result
    },
    editCartReq(type, item, quantity) {
      const params = { quantity, itemId: item.cartItemId }
      console.log('-params-', params)
      this.$pageLoading.show('加载中...')
      api
        .editCartNum(params)
        .then(res => {
          // console.log('-res-', res)
          this.$pageLoading.hide()
          if (type === 'sub') {
            item.purchaseQuantity--
            item.totalPrice = jsPrecision.sub(item.totalPrice, item.unitPrice)
            if (item.status) {
              this.totalPrice = jsPrecision.sub(this.totalPrice, item.unitPrice)
            }
          } else {
            item.purchaseQuantity++
            item.totalPrice = jsPrecision.add(item.totalPrice, item.unitPrice)
            if (item.status) {
              this.totalPrice = jsPrecision.add(this.totalPrice, item.unitPrice)
            }
          }
        })
        .catch(error => {
          this.$pageLoading.hide()
        })
    },
    getData() {
      this.$loading.show()
      api
        .getCartList()
        .then(res => {
          this.$loading.hide()
          this.isMoreLoading = false
          console.log('-res-', res)
          // invalidCartItems = 过期的购物车商品集合
          // shopItems = 购物车店铺集合
          const { invalidCartItems, shopItems } = res.data
          // console.log('-cart-', shopItems)
          // TODO: 获取shopItems第一个值
          const cartList = shopItems[0].cartItems
          this.list = this.setData(cartList)
          console.log('-list-', this.list)
          // TODO: 暂时没有分页，后面需要再迭代
          // if (this.list.length >= 30) {
          //   最后一页数据
          //   this.isMoreFinished = true
          // }
        })
        .catch(error => {
          this.$loading.hide()
        })
    },
    setData(list) {
      let result = []
      list.map(val => {
        let mid = {}
        let totalPrice = jsPrecision.mul(val.purchaseQuantity, val.unitPrice)
        mid = { totalPrice, status: false, ...val }
        result.push(mid)
      })
      return result
    },
    // 加载更多
    getMoreData() {
      console.log('加载更多')
      this.isMoreFinished = true
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgComUrl: '~@/assets/images/com/';
@mainBg: #f9fafc;
.cart-page {
  .circle {
    display: block;
    width: 18px;
    height: 18px;
    background: url('@{imgComUrl}icon-no-checked.png') no-repeat center / cover;
    margin-right: 12px;

    &.activeIcon {
      background: url('@{imgComUrl}icon-checked.png') no-repeat center / cover;
    }
  }
}

.main {
  background: @mainBg;
  color: #292929;
  padding: 12px 15px;
  .itemBox {
    background: #fff;
    // box-shadow: rgb(236, 224, 224) 0px 3px 10px;
    border-radius: 10px;
    padding: 16px 15px 16px 12px;
    margin-bottom: 12px;

    .right {
      .imgBox {
        overflow: hidden;
        width: 124px;
        height: 124px;
        background: #f6f5f3;
        border-radius: 8px;
        margin-right: 12px;

        .img {
          display: block;
          max-width: 124px;
          max-height: 124px;
        }
      }

      .descBox {
        .top {
          .title {
            font-size: 15px;
            line-height: 21px;
            margin-bottom: 12px;
          }
          .desc {
            color: #d2d4d9;
            font-size: 12px;
          }
        }

        .bottom {
          width: 100%;
          .price {
            color: #5fc0a3;
            font-size: 18px;
            line-height: 26px;
          }
          .num {
            color: #b1b2b7;

            .icon {
              width: 20px;
              height: 20px;

              &.icon-sub {
                background: url('@{imgComUrl}icon-sub.png') no-repeat center / cover;
              }
              &.icon-add {
                background: url('@{imgComUrl}icon-add.png') no-repeat center / cover;
              }
            }
            p {
              padding: 0 14px;
            }
          }
        }
      }
    }
  }
}

.footerWrap {
  height: 60px;
}

.footerContent {
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 60px;
  background: #fff;
  font-size: 16px;
  padding: 8px 15px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  .left {
    color: #b1b2b7;
  }

  .right {
    color: #5fc0a3;

    .price {
      font-size: 18px;
      padding-left: 10px;
    }

    .van-button {
      width: 100px;
      margin-left: 16px;
    }
    /deep/ .van-button--info {
      background-color: #5fc0a3;
      border: 1px solid#5FC0A3;
    }

    /deep/ .van-button--primary {
      border: 1px solid #5fc0a3;
    }
  }
}
</style>
