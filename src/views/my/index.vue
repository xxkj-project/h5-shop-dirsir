<!--
 * @Author: wangshengxian
 * @Date: 2020-10-25 22:50:36
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-15 14:51:02
 * @Desc: 我的 - page
-->
<template>
  <div class="my-page">
    <div class="main fx-column">
      <div class="topBg"></div>
      <div class="container flex1">
        <div class="content">
          <div class="userIconWrap">
            <div class="avatarBox fx-center">
              <img class="avatarIcon" src="@/assets/images/com/defaultImg.png" alt="" v-if="!userInfo.smallPic" />
              <img class="avatarIcon" :src="userInfo.smallPic" alt="" v-else />
            </div>
          </div>
          <p class="userName">{{ userInfo.myName }}</p>
          <div class="globalModule">
            <ul class="moduleWrap orderStatusWrap fx-align-center">
              <li
                class="item fx-column-center"
                v-for="(item, index) in orderStatusList"
                :key="index"
                @click="onJumpOrder(item)"
              >
                <div class="iconBox fx-center">
                  <img :src="item.imgUrl" alt="" />
                  <p class="mark fx-center" v-if="item.num">{{ item.num }}</p>
                </div>

                <p class="orderTitle">{{ item.title }}</p>
              </li>
            </ul>
          </div>
          <div class="globalModule">
            <ul class="moduleWrap otherWrap">
              <li
                class="item fx-align-center"
                v-for="(item, index) in otherList"
                :key="index"
                @click="onJumpOther(item)"
              >
                <span class="icon" :class="'icon' + '_' + index"></span>
                <div class="right fx-space-between-center flex1">
                  <p>{{ item.title }}</p>
                  <span class="arrow"></span>
                </div>
              </li>
            </ul>
          </div>
          <div class="linkAddress flexbox">
            <p>永久访问地址：</p>
            <div class="rightBox fx-space-between flex1">
              <p>{{ linkUrl }}</p>
              <copyTxt :txt="linkUrl" :isCustom="true" @success="handleCopySuccess" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import copyTxt from '@/components/copyTxt'
import api from '@/api/user'
import { orderEnum } from '@/utils/globalConst'
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {
      linkUrl: 'http://blog.xinxingouwu.com',
      orderStatusList: [
        {
          status: orderEnum.TO_PAY,
          title: '待付款',
          imgUrl: require('@/assets/images/my/icon-my-order1.png')
        },
        {
          status: orderEnum.TO_SEND,
          title: '待发货',
          imgUrl: require('@/assets/images/my/icon-my-order2.png')
        },
        { status: orderEnum.ALL, title: '全部', imgUrl: require('@/assets/images/my/icon-my-order3.png') }
      ],
      otherList: [
        { pathName: 'Address', title: '地址管理' },
        { pathName: 'MySet', title: '我的设置' },
        // { pathName: 'PersonalDetails', title: '个人信息' },
        // { pathName: 'Kefu', title: '客服中心' },
        { pathName: 'AboutUs', title: '关于我们' }
      ],
      infoData: { waitToPay: 0, waitToSend: 0 }
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo'])
  },
  created() {
    console.log(this.userInfo)
    this.getData()
  },
  mounted() {},
  methods: {
    onJumpOrder(item) {
      console.log('-item-', item)
      const { status } = item
      // TODO: 去订单列表页
      this.$router.push({ name: 'Order', query: { status, fromRouteName: 'My' } })
    },
    onJumpOther(item) {
      console.log('-item-', item)
      this.$router.push({ name: item.pathName })
    },
    handleCopySuccess() {
      // console.log('复制成功')
      let msg = '复制成功,请您用手机自带浏览器访问复制的链接,并收藏保存!'
      this.$toast({
        message: msg,
        duration: 3000
      })
    },
    getData() {
      this.$loading.show()
      api.getUserInfo().then(res => {
        this.$loading.hide()
        console.log('-res-', res)
        const data = res.data
        this.infoData = data
        this.orderStatusList = this.orderStatusList.map(val => {
          let num = 0
          if (val.status === 'TO_PAY') {
            num = this.infoData.waitToPay
          } else if (val.status === 'TO_SEND') {
            num = this.infoData.waitToSend
          } else {
            num = 0
          }
          return { num, ...val }
        })
        console.log(this.orderStatusList)
      })
    }
  },
  components: { copyTxt }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/my/';
@imgComUrl: '~@/assets/images/com/';
@rate: 1 / 3;

.my-page {
  .main {
    height: 100%;
    .topBg {
      width: 100%;
      height: 197px;
      background: url('@{imgUrl}myTopBg.png') no-repeat center / cover;
    }
  }
}

.container {
  position: relative;
  .content {
    position: absolute;
    top: -50px;
    width: 100%;
    background: #f9fafc;
    // background: #ccc;
    border-radius: 24px 24px 0 0;
    padding-bottom: 125px;

    .globalModule {
      padding: 0 15px;
      margin-bottom: 16px;

      .moduleWrap {
        border-radius: 10px;
      }
    }
  }
}

.userIconWrap {
  position: relative;
  width: 100%;
  height: 50px;

  .avatarBox {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    background: #fff;
    // background: orange;
    border-radius: 50%;
    .avatarIcon {
      display: block;
      width: 92px;
      height: 92px;
      border-radius: 50%;
    }
  }
}

.userName {
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  padding: 8px 0 32px 0;
}

.orderStatusWrap {
  background: #fff;
  padding: 36px 0 32px 0;

  .item {
    width: 100% * @rate;
    .iconBox {
      position: relative;
      margin-bottom: 17px;

      img {
        height: 27px;
      }

      .mark {
        position: absolute;
        top: -9px;
        right: -7px;
        height: 18px;
        background: #ffcc7e;
        line-height: 18px;
        color: #fff;
        font-size: 11px;
        border: 2px solid #ffffff;
        border-radius: 9px;
        padding: 0 4px;
      }
    }
    .orderTitle {
      color: #b1b2b7;
      font-size: 16px;
      line-height: 22px;
    }
  }
}

.otherWrap {
  padding: 16px 15px;
  background: #fff;
  .item {
    line-height: 62px;
    .icon {
      width: 30px;
      height: 30px;
      margin-right: 16px;

      &.icon_0 {
        background: url('@{imgUrl}icon-my-options1.png') no-repeat center / cover;
      }
      &.icon_1 {
        background: url('@{imgUrl}icon-my-options2.png') no-repeat center / cover;
      }
      &.icon_2 {
        background: url('@{imgUrl}icon-my-options3.png') no-repeat center / cover;
      }
      &.icon_3 {
        background: url('@{imgUrl}icon-my-options4.png') no-repeat center / cover;
      }
      &.icon_4 {
        background: url('@{imgUrl}icon-my-options5.png') no-repeat center / cover;
      }
    }

    .arrow {
      width: 7px;
      height: 12px;
      background: url('@{imgComUrl}icon-right-arrow.png') no-repeat center / cover;
    }
  }
}

.linkAddress {
  padding: 15px;
}
</style>
