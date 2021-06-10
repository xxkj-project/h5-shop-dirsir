<!--
   瀑布流list
-->
<template>
  <div class="waterfallWrap">
    <van-list
      id="waterfall"
      class="content"
      :style="{ height: contentHeight / remBase + 'rem' }"
      v-model="isMoreLoading"
      :finished="isMoreFinished"
      :error.sync="isMoreError"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      :offset="offset"
      :immediate-check="false"
      @load="handleLoad"
    >
      <div
        class="item"
        v-for="(item, index) in waterfallList"
        :key="index"
        :style="{
          top: item.top / remBase + 'rem',
          left: item.left / remBase + 'rem',
          width: itemWidth / remBase + 'rem',
          height: item.height / remBase + 'rem'
        }"
      >
        <div class="imgBox">
          <img :src="item.image" :style="{ width: itemWidth / remBase + 'rem' }" alt="" />
        </div>
        <p class="itemTitle one-txt-cut">{{ item.title }}</p>
        <p class="itemPrice">{{ item.salePrice | price }}</p>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      remBase: 41.4,
      waterfallList: [], // 存放计算好的数据,最后渲染成html结构的数组
      itemWidth: 75, // 默认item宽度
      itemMarginRight: 16, // 右边距
      itemMarginBottom: 90, // 下边距
      waterfallDeviationHeight: [], // 瀑布流个各列高度
      contentHeight: 0,

      isMoreLoading: false,
      isMoreFinished: false,
      isMoreError: false,
      offset: 30,
      currentList: [] // 当前页list
    }
  },
  props: {
    // 列数，默认为两列
    waterfallCol: {
      type: Number,
      default: 2
    },
    total: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    // 1、计算item宽度，初始化各列高度数组
    // 2、图片预加载，获取图片的宽高
    // 3、计算图片的偏移量
  },
  watch: {
    // list: {
    //   handler(newVal, oldVal) {
    //     console.log(newVal, oldVal)
    //   },
    //   deep: true
    // }
    list(newVal, oldVal) {
      console.log('-new-', newVal, '-old-', oldVal)
      this.isMoreLoading = false
      let lenDiff = oldVal.length
      console.log(lenDiff)
      this.currentList = newVal.slice(lenDiff)
      // console.log(this.currentList)
      if (newVal.length >= this.total) {
        console.log('全部加载完成')
        this.isMoreFinished = true
      }
      this.calculationWidth()
    }
  },
  methods: {
    handleLoad() {
      let placeholderEl = document.querySelector('.van-list__placeholder').getBoundingClientRect()
      console.log(111, placeholderEl)
      // let listEl = document.querySelector('.van-list')
      // console.log(listEl)s
      console.log('加载下一页')
      this.$emit('loadMore')
    },
    //计算每个图片的宽度或者是列数
    calculationWidth() {
      let domWidth = document.getElementById('waterfall').offsetWidth
      console.log(domWidth) // 375
      if (!this.itemWidth && this.waterfallCol) {
        console.log('没有图片宽度')
        this.itemWidth = (domWidth - this.itemMarginRight * (this.waterfallCol - 1)) / this.waterfallCol
      } else if (this.itemWidth && !this.waterfallCol) {
        console.log('没有图片列数')
        this.waterfallCol = Math.floor((domWidth + this.itemMarginRight) / (this.itemWidth + this.itemMarginRight))
      }
      this.itemWidth = (domWidth - this.itemMarginRight * (this.waterfallCol - 1)) / this.waterfallCol
      console.log('-imgWidth-', this.itemWidth, '-imgCol-', this.waterfallCol)

      //初始化偏移高度数组
      this.waterfallDeviationHeight = new Array(this.waterfallCol)
      for (let i = 0; i < this.waterfallDeviationHeight.length; i++) {
        this.waterfallDeviationHeight[i] = 0
      }
      console.log(this.waterfallDeviationHeight)
      this.imgPreloading()
    },
    // 图片预加载，获取图片宽高
    imgPreloading() {
      for (let i = 0; i < this.currentList.length; i++) {
        console.log('-curr-', this.currentList[i])
        let imgEl = new Image()
        imgEl.src = this.currentList[i].image
        imgEl.onload = imgEl.onerror = e => {
          let itemData = {}
          //根据设定的列宽度求出图片的高度
          itemData.height = (this.itemWidth / imgEl.width) * imgEl.height
          itemData = { ...itemData, ...this.currentList[i] }
          this.waterfallList.push(itemData)
          console.log(this.waterfallList)
          //调用图片位置计算方法
          this.rankImg(itemData)
        }
      }
    },
    // 计算图片偏移量
    rankImg(imgData) {
      let { itemWidth, itemMarginRight, itemMarginBottom, waterfallDeviationHeight, waterfallCol } = this
      //找出当前最短列的索引
      let minIndex = this.filterMin()
      // console.log(minIndex)
      //获取最短列底部高度，既下一张图片的顶部高度
      imgData.top = waterfallDeviationHeight[minIndex]
      //计算左侧偏移，最短列索引*（右边距+列宽度）
      imgData.left = minIndex * (itemMarginRight + itemWidth)
      //改变当前列高度
      waterfallDeviationHeight[minIndex] += imgData.height + itemMarginBottom
      this.contentHeight = Math.max.apply(null, this.waterfallDeviationHeight)
      // console.log(imgData)
      // console.log(this.waterfallDeviationHeight)
    },
    // 添加其它信息
    otherInfoFunc(imgData) {},
    /**
     * 找到最短的列并返回下标
     * @returns {number} 下标
     */
    filterMin() {
      const min = Math.min.apply(null, this.waterfallDeviationHeight)
      return this.waterfallDeviationHeight.indexOf(min)
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.waterfallWrap {
  height: 100%;
  // padding: 10px 10px 0;
  // overflow-y: auto;
  // -webkit-overflow-scrolling: touch;
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .item {
      position: absolute;
      img {
        width: auto;
        height: auto;
      }
      .itemTitle {
        // width: 184px;
        font-size: 15px;
        color: #292929;
        padding: 12px 0;
      }

      .itemPrice {
        font-size: 18px;
        line-height: 25px;
        color: #5fc0a3;
        padding-bottom: 24px;
      }
    }
  }
  /deep/ .van-list {
    // position: relative;
    // width: 100%;
    // height: 100%;
    // .van-list__finished-text {
    //   position: absolute;
    //   bottom: 0;
    //   z-index: 1000;
    //   width: 100%;
    // }
  }
}
</style>
