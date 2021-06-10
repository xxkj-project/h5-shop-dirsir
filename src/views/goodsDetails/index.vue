<!--
 * @Author: wangshengxian
 * @Date: 2020-10-26 10:58:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-24 15:14:37
 * @Desc: 商品详情
-->
<template>
  <div class="details-page">
    <searchBar isMainFullScreen :opacity="headConfig.opacity" />
    <div class="bannerWrap">
      <swiper class="swiperWrap" ref="swiperRef" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in bannerList" :key="index">
          <div class="imgBox fx-center" :style="{ width: bannerImgHeight, height: bannerImgHeight }">
            <img
              class="img"
              :src="item.url"
              :style="{ maxWidth: bannerImgHeight, maxHeight: bannerImgHeight }"
              alt=""
            />
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="content">
      <div class="groupWrap">
        <div class="descBox fx-column-align-center">
          <p class="price">
            <span class="sellPrice">{{ baseInfoData.presentPrice | price }}</span>
            <span class="originalPrice">{{ baseInfoData.originalPrice | price }}</span>
          </p>
          <p class="title">{{ baseInfoData.title }}</p>
          <p class="descTxt">{{ baseInfoData.description }}</p>
        </div>
      </div>
      <div class="groupWrap">
        <div class="operateBox">
          <span class="label">选择</span>
          <p class="center" @click="onOpenSku">{{ actSkuName }}</p>
          <span class="icon"></span>
        </div>
        <div class="operateBox">
          <span class="label">服务</span>
          <p class="center">{{ serviceTxt }}</p>
        </div>
      </div>
      <div class="detailsBox">
        <div class="detailsTop fx-center">
          <span></span>
          <p>详情介绍</p>
          <span></span>
        </div>
        <div class="detailsBottom">
          <div class="imgItem" v-for="(imgUrl, index) in detailsImgs" :key="index">
            <img v-lazy="imgUrl" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="footerWrap fx-center">
      <van-button class="addBtn flex1" type="primary" round plain @click="onAdd">加入购物车</van-button>
      <van-button type="info flex1" round @click="onBuy">立即购买</van-button>
    </div>

    <skuItem :goodsId="goodsId" :skuImg="skuImg" :infoData="skuData" :visible.sync="isSku" />
  </div>
</template>

<script>
import searchBar from './components/detailsHeader'
import skuItem from './components/skuItem'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import api from '@/api'
import headerMixins from './mixins/headerConfig'
import { mapState } from 'vuex'
export default {
  name: '',
  mixins: [headerMixins],
  data() {
    return {
      isSku: false,
      skuName: '颜色',
      skuData: {},
      skuImg: '',
      goodsId: 0,
      bannerList: [], // 轮播图list
      serviceTxt: '', // 服务说明文本
      baseInfoData: {}, // 商品基本信息
      detailsList: [],
      detailsImgs: [], // 商品详情图
      swiperOptions: {
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {
    bannerImgHeight() {
      console.log(window.innerWidth)
      return window.innerWidth + 'px'
    },
    actSkuName() {
      return this.skuName
    },
    ...mapState('user', ['key'])
  },
  watch: {
    bannerList: {
      handler(val) {
        console.log('-watch-', val)
      },
      deep: true
    }
  },
  created() {
    this.goodsId = this.$route.query.id
    this.getData()
    this.getSkuData()
    // TODO: 后面优化，添加详情页数据本地存储，减少接口请求
    // TODO: 滑动页面后轮播图会重新加载，暂时不知后面再处理
  },
  mounted() {},
  methods: {
    onOpenSku() {
      // this.skuName = '选择sku'
      this.isSku = true
      console.log(this.goodsId)
    },
    onAdd() {
      // console.log('加入购物车')
      // 验证用户是否登录
      // console.log('-key-', this.key)
      if (!this.key) {
        this.$router.push({ name: 'Login' })
        return
      }
      this.isSku = true
    },
    onBuy() {
      // console.log('立即购买')
      // 验证用户是否登录
      // console.log('-key-', this.key)
      if (!this.key) {
        this.$router.push({ name: 'Login' })
        return
      }
      this.isSku = true
    },
    getData() {
      api.getGoodsDetails({ id: this.goodsId }).then(res => {
        console.log('-details-res-', res)
        const data = res.data
        this.serviceTxt = data.note
        this.bannerList = data.productPhotos
        this.baseInfoData = data.productBaseInfo
        this.detailsList = data.productDetail
        this.detailsImgs = data.productDetailPhotos
        this.skuImg = this.bannerList[0].url
      })
    },
    getSkuData() {
      api.getGoodsSku({ id: this.goodsId }).then(res => {
        console.log('-sku-res-', res)
        const data = res.data
        this.skuData = data
      })
    }
  },
  components: { searchBar, Swiper, SwiperSlide, skuItem }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgComUrl: '~@/assets/images/com/';

/deep/ .header-global {
  .icon {
    background: url('@{imgComUrl}icon-cart3.png') no-repeat center / cover;
  }
}

.details-page {
  .bannerWrap {
    .imgBox {
      img {
        display: block;
      }
    }
  }
  .content {
    .groupWrap {
      width: 100%;
      background: #fff;
      padding: 0 15px;
      margin-bottom: 15px;
    }
  }
  .footerWrap {
    position: fixed;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 60px;
    background: #fff;
    padding: 8px 15px;

    .van-button {
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
}

.descBox {
  padding-top: 20px;

  .price {
    color: #5fc0a3;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 12px;

    .originalPrice {
      color: #999;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 6px;
    }
  }

  .title {
    color: #292929;
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 20px;
  }

  .descTxt {
    margin-bottom: 31px;
  }
}

.operateBox {
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 54px;
  border-bottom: 1px solid #efeff1;
  &:last-child {
    border-bottom: none;
  }

  .label {
    width: 60px;
    color: #292929;
  }

  .center {
    flex: 1;
    color: #b1b2b7;
  }

  .icon {
    width: 7px;
    height: 12px;
    background: url('@{imgComUrl}icon-right-arrow.png') no-repeat center / cover;
  }
}

.detailsBox {
  padding-bottom: 60px;

  .detailsTop {
    margin-bottom: 15px;

    span {
      width: 48px;
      height: 1px;
      background: #efeff1;
    }

    p {
      font-size: 14px;
      color: #b1b2b7;
      line-height: 20px;
      padding: 0 8px;
    }
  }

  .detailsBottom {
    // margin-bottom: 60px;

    .imgItem {
      width: 100%;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
