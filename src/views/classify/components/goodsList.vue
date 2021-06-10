<!--
 * @Author: wangshengxian
 * @Date: 2020-10-25 23:33:03
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-08 10:23:26
 * @Desc: 分类商品列表 - components
-->

<template>
  <div class="goodslist-components">
    <div class="goodslist-container">
      <div class="item" v-for="(item, index) in list" :key="index" @click="onDetails(item)">
        <div class="imgBox fx-center">
          <img class="img" alt="" v-lazy="item.image" />
        </div>
        <div class="itemDesc">
          <p class="name one-txt-cut">{{ item.title }}</p>
          <p class="price">
            <span class="sellPrice">{{ item.price | price }}</span
            ><span class="originalPrice" v-if="item.showPrice">{{ item.showPrice | price }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onDetails(item) {
      // console.log('-item-', item)
      const { id } = item
      this.$router.push({ name: 'GoodsDetails', query: { id } })
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.goodslist-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // background: #ccc;
    // background: #f9fafc;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 16px;

    &:nth-child(2n) {
      margin-right: 0;
    }

    .imgBox {
      width: 184px;
      height: 184px;
      background: #f6f5f3;

      .img {
        display: block;
        max-width: 184px;
        max-height: 184px;
        // max-height: 245px;
      }
    }

    .itemDesc {
      padding-left: 10px;

      .name {
        width: 174px;
        font-size: 15px;
        color: #292929;
        padding: 12px 0 12px 4px;
      }

      .price {
        line-height: 25px;
        padding-bottom: 24px;

        .sellPrice {
          font-size: 18px;
          color: #5fc0a3;
        }
        .originalPrice {
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
