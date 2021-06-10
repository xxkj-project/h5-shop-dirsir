<!--
 * @Author: wangshengxian
 * @Date: 2020-10-26 18:10:44
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-24 14:59:26
 * @Desc: sku - components
-->
<template>
  <div class="sku-dialog" v-show="dialogVisible" @click="onClose">
    <div class="skuWrap" @click.stop="onSku">
      <div class="skuContainer fx-column">
        <div class="containerTop flexbox">
          <div class="imgBox fx-center">
            <img v-lazy="skuImg" alt="" />
            <!-- <img :src="skuImg" alt="" /> -->
          </div>
          <div class="descBox fx-column-end flex1">
            <p class="price">{{ priceTxt | price }}</p>
            <p class="stock">库存{{ stockNum }}件</p>
            <template v-if="!isShowSku">
              <div class="desc flexbox">
                <p>请选择</p>
                <p v-for="(item, index) in skuConfigs" :key="index">
                  <span v-show="!item.status">{{ item.title }}</span>
                </p>
              </div>
            </template>
            <template v-else>
              <div class="desc flexbox">
                <p>已选:</p>
                <p v-for="(item, index) in skuConfigs" :key="index">{{ item.value }}</p>
              </div>
            </template>
          </div>
        </div>
        <div class="containerBottom flex1">
          <div class="bottomContainer">
            <div class="itemOptions" v-for="(itemOptions, oneIdx) in specAndValueS" :key="oneIdx">
              <p class="title">{{ itemOptions.name }}</p>
              <div class="itemBox flexbox">
                <p
                  class="name"
                  :class="{ actSku: actSkuIds[itemOptions.id] === item.id }"
                  v-for="(item, twoIdx) in itemOptions.mallSpecValueS"
                  :key="twoIdx"
                  @click.stop="onSelSku(itemOptions, item, oneIdx)"
                >
                  {{ item.name }}
                </p>
              </div>
            </div>

            <!-- 备注 -->
            <!-- <div class="remarkBox">
              <van-field v-model="remarkVal" clearable label="备注：" placeholder="请填写备注"></van-field>
            </div> -->

            <div class="quantityBox fx-space-between-center">
              <p class="title">数量</p>
              <p class="fx-center">
                <span class="icon sub" @click.stop="onSubNum"></span>
                <span class="num">{{ num }}</span
                ><span class="icon add" @click.stop="onAddNum"></span>
              </p>
            </div>
          </div>
        </div>
        <span class="closeBtn" @click="onClose"></span>
      </div>
      <div class="footerWrap fx-center">
        <van-button class="addBtn flex1" type="primary" round plain @click.stop="onAddCart">加入购物车</van-button>
        <van-button type="info flex1" round @click.stop="onBuy">立即购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/cart'
export default {
  name: '',
  data() {
    return {
      remarkVal: '',
      skuBools: [], // 规格选中与否
      skuConfigs: [], // 规格配置项(选中与否，选中规格值) {title: '',value:'',status: false}
      actSkuIds: {}, // 选中的sku
      sku: {
        skuId: '',
        viewImg: 'https://img.yzcdn.cn/2.jpg',
        price: '',
        stock: '',
        num: 1
      },
      quota: 0, // TODO: 限购数，0表示不限购
      quotaUsed: 0 // 已经购买的数量
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    goodsId: {
      type: String | Number, // eslint-disable-line
      required: true
    },
    skuImg: {
      type: String,
      required: true
    },
    infoData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isShowSku() {
      return !this.skuBools.includes(false)
    },
    priceTxt() {
      let result = this.isShowSku ? this.sku.price : `${this.productPrice.minPrice}-${this.productPrice.maxPrice}`
      return result
    },
    // 库存
    stockNum() {
      return this.isShowSku ? this.sku.stock : this.stockQuantity
    },
    num() {
      return this.sku.num
    },
    // 商品价格(最低价和最高价)
    productPrice() {
      console.log('-price-', this.infoData.productPrice)
      return this.infoData.productPrice
    },
    // 商品sku
    skuS() {
      console.log('-sku-', this.infoData.skuS)
      return this.infoData.skuS
    },
    // 商品规格
    specAndValueS() {
      console.log('-商品规格-', this.infoData.specAndValueS)
      return this.infoData.specAndValueS
    },
    // 库存总量
    stockQuantity() {
      console.log('-总库存量-', this.infoData.stockQuantity)
      return this.infoData.stockQuantity
    },
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    productPrice(val) {
      // console.log('-watch-sku-', val)
    },
    skuS(val) {
      // console.log('-watch-sku-', val)
    },
    specAndValueS(data) {
      console.log('-watch-规格-', data)
      if (data) {
        data.map(val => {
          this.skuBools.push(false)
          this.skuConfigs.push({ title: val.name, value: '', status: false })
        })
      }
    },
    stockQuantity(val) {
      // console.log('-watch-sku-', val)
    }
  },
  filters: {},
  created() {},
  mounted() {},
  methods: {
    onClose() {
      this.dialogVisible = false
    },
    onSku() {
      // console.log(111)
    },
    onSelSku(itemOpt, item, index) {
      console.log(itemOpt, item, index)
      this.setSkuIds(itemOpt.id, item.id)
      this.setSkuConfigs(index, item.name)
      console.log(this.skuBools, this.actSkuIds, this.skuS)
      if (!this.skuBools.includes(false)) {
        let skuIds = Object.values(this.actSkuIds).toString()
        console.log('-skuIds-', skuIds)
        let skuData = this.skuS.filter(val => val.specValueIds === skuIds)[0]
        console.log('-最终选中的sku-', skuData)
        this.sku.skuId = skuData.id
        this.sku.price = skuData.price
        this.sku.stock = skuData.stockQuantity
        // TODO: 缺少一个规格图的替换图片
      }
    },
    // 设置skuIds
    setSkuIds(key, data) {
      console.log('-act-sku-ids-', this.actSkuIds)
      let val = this.actSkuIds[key] === data ? '' : data
      this.$set(this.actSkuIds, key, val)
    },
    // 设置规格显示文本的配置(价格下面的一行文字描述)
    setSkuConfigs(index, value) {
      let obj = this.skuConfigs[index]
      if (obj.value === value) {
        console.log('-取消-sku-')
        obj.value = ''
        obj.status = false
        this.skuBools.splice(index, 1, false)
      } else {
        console.log('-选中-sku-')
        obj.value = value
        obj.status = true
        this.skuBools.splice(index, 1, true)
      }
      this.skuConfigs[index] = obj
    },
    onSubNum() {
      if (this.sku.num <= 1) {
        this.$toast('数量不能再减少了！')
        return
      }
      this.sku.num--
    },
    onAddNum() {
      this.sku.num++
    },
    // TODO: 需要使用防抖或者节流来优化 -- 流程走通后再来实现
    onAddCart() {
      console.log('加入购物车')
      this.validateFunc(() => {
        const params = { skuId: this.sku.skuId, quantity: this.sku.num }
        console.log('-params-', params)
        api.addCart(params).then(res => {
          console.log('-res-', res)
          // 更新购物车的数量
          this.$store.dispatch('cart/getCartNum')
          this.$toast({
            message: '添加成功！',
            position: 'bottom',
            duration: 1500,
            onClose: () => {
              this.dialogVisible = false
            }
          })
        })
      })
    },
    // TODO: 需要使用防抖或者节流来优化 -- 流程走通后再来实现
    onBuy() {
      this.validateFunc(() => {
        const queryObj = [
          {
            skuId: this.sku.skuId,
            quantity: this.sku.num,
            cartItemId: 0,
            remark: this.remarkVal
          }
        ]
        this.$router.push({
          path: '/confirmOrder',
          query: { skus: JSON.stringify(queryObj), fromRouteName: 'GoodsDetails' }
        })
      })
    },

    // 验证规格是否选择完整
    validateFunc(callback) {
      // 验证用户是否登录
      // console.log('-key-', this.$store.state.user.key)
      // TODO: 此处需不需要记住用户选择的商品信息，看后面的需求
      if (!this.$store.state.user.key) {
        this.$router.push({ name: 'Login' })
        return
      }
      console.log('-act-sku-ids-', this.actSkuIds)
      if (JSON.stringify(this.actSkuIds) === '{}') {
        this.$toast('请选择商品属性!')
        return
      }
      let result = []
      Object.keys(this.actSkuIds).forEach(key => {
        this.actSkuIds[key] && result.push(this.actSkuIds[key])
      })
      // console.log(result)
      if (result.length != this.specAndValueS.length) {
        this.$toast('请选择商品属性!')
        return
      }
      // if (!this.remarkVal) {
      //   this.$toast('请填写备注!')
      //   return
      // }
      console.log('-sku-', this.sku)
      if (this.sku.num > this.sku.stock) {
        this.$toast('库存不足！')
        return
      }
      callback()
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgComUrl: '~@/assets/images/com/';

.sku-dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  .skuWrap {
    width: 100%;
    height: 586px;
    background: #fff;
    border-radius: 16px 16px 0 0;
  }
}

.skuContainer {
  position: relative;
  height: 100%;
  padding: 27px 15px 56px;

  .closeBtn {
    position: absolute;
    right: 15px;
    top: 27px;
    width: 17px;
    height: 17px;
    background: url('@{imgComUrl}icon-cancel.png') no-repeat center/ cover;
  }
}
.containerTop {
  margin-bottom: 16px;
  .imgBox {
    width: 130px;
    height: 130px;
    // background: #f6f5f3;
    background: #fff;
    border-radius: 10px;
    // border: 1px solid #ccc;
    img {
      display: block;
      max-width: 124px;
      max-height: 124px;
    }
  }
  .descBox {
    margin-left: 16px;

    .price {
      font-size: 20px;
      color: #5fc0a3;
      line-height: 28px;
    }

    .stock {
      font-size: 14px;
      color: #b1b2b7;
      line-height: 20px;
      padding-top: 8px;
    }

    .desc {
      font-size: 14px;
      color: #b1b2b7;
      line-height: 20px;
      padding: 8px 0 7px 0;

      p {
        margin-right: 10px;
      }
    }
  }
}

.containerBottom {
  -webkit-overflow-scrolling: touch;
  overflow: auto;

  .title {
    font-size: 16px;
    font-weight: 700;
    padding: 8px 0 16px 0;
  }

  .itemBox {
    flex-wrap: wrap;

    .name {
      font-size: 14px;
      color: #b1b2b7;
      line-height: 36px;
      padding: 0 24px;
      border: 1px solid #efeff1;
      border-radius: 18px;
      margin-right: 27px;
      margin-bottom: 16px;

      &.actSku {
        color: #5fc0a3;
        border: 1px solid #5fc0a3;
      }
    }
  }

  .remarkBox {
    /deep/ .van-cell {
      line-height: 36px;
      padding: 10px 0;
      .van-field__label {
        width: 50px;
        font-size: 16px;
        span {
          font-weight: 700;
        }
      }
      .van-field__control {
        border: 1px solid rgb(233, 232, 232);
        border-radius: 6px;
        padding-left: 8px;
      }
    }
  }

  .quantityBox {
    padding: 8px 0 47px 0;
    .title {
      font-size: 16px;
      font-weight: 700;
    }
    .num {
      width: 38px;
      font-size: 14px;
      color: #b1b2b7;
      text-align: center;
    }

    .icon {
      width: 20px;
      height: 20px;

      &.sub {
        background: url('@{imgComUrl}icon-sub.png') no-repeat center / cover;
      }

      &.add {
        background: url('@{imgComUrl}icon-add.png') no-repeat center / cover;
      }
    }
  }
}

.footerWrap {
  position: absolute;
  bottom: 0;
  z-index: 10000;
  width: 100%;
  height: 60px;
  background: #fff;
  padding: 8px 15px;

  .van-button {
    // flex: 1;
    // width: 184px;

    &.addBtn {
      margin-right: 15px;
    }
  }
}
/deep/ .van-button--info {
  background-color: #5fc0a3;
  border: 1px solid#5FC0A3;
}

/deep/ .van-button--primary {
  border: 1px solid #5fc0a3;
}
</style>
