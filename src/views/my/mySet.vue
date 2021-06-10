<!--
 * @Author: wangshengxian
 * @Date: 2020-10-29 15:19:22
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-01 14:51:48
 * @Desc: 我的设置 - page
-->
<template>
  <div class="myset-page">
    <headerBar />
    <div class="main">
      <div class="container">
        <ul class="infoBox">
          <li class="item fx-center">
            <div class="uploadBox">
              <van-uploader :after-read="handleAfterRead">
                <div class="fx-space-between-center flex1">
                  <p class="itemTitle">头像</p>
                  <img class="userIcon" src="@/assets/images/com/defaultImg.png" alt="" v-if="!userInfo.smallPic" />
                  <img class="userIcon" :src="userInfo.smallPic" alt="" v-else />
                </div>
                <span class="rightArrowIcon"></span>
              </van-uploader>
            </div>
          </li>
          <li class="item fx-center" @click="onEditName">
            <div class="fx-space-between-center flex1">
              <p class="itemTitle">昵称</p>
              <p class="userName">{{ userInfo.myName }}</p>
            </div>
            <span class="rightArrowIcon"></span>
          </li>
        </ul>

        <div class="btnBox">
          <van-button class="logOutBtn" type="default" @click="onLogOut">退出登录</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import { mapGetters } from 'vuex'
import Cookie from 'js-cookie'
import api from '@/api/user'
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('user', ['userInfo', 'code'])
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      console.log(this.userInfo, this.code)
    })
  },
  methods: {
    handleAfterRead(a) {
      // console.log('-a-', a)
      this.$pageLoading.show('加载中...')
      let formData = new FormData()
      formData.append('head', a.file)
      api
        .editIcon(formData)
        .then(res => {
          // console.log('-res-', res.data.smallPic)
          this.$pageLoading.hide()
          this.$toast({
            type: 'success',
            message: '修改成功!',
            onClose: () => {
              let userInfo = { ...this.userInfo }
              userInfo.smallPic = res.data.smallPic
              // TODO: 后面换成storage存储
              Cookie.set('userInfo', userInfo, { expires: 1 })
              this.$store.commit('user/setUserInfo', userInfo)
            }
          })
        })
        .catch(err => {
          this.$pageLoading.hide()
          this.$toast({
            type: 'fail',
            message: '修改失败!'
          })
        })
    },

    onEditName(type) {
      const routeName = 'EditNickname'
      this.$router.push({ name: routeName, query: { nickname: this.userInfo.myName } })
    },
    onLogOut() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确认退出?'
        })
        .then(() => {
          Cookie.remove('key')
          Cookie.remove('cart_num')
          this.$store.commit('user/setKey', '')
          this.$store.commit('cart/setCartNum', 0)
          const path = `/index/${this.code}`
          this.$router.push(path)
        })
        .catch(() => {})
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgComUrl: '~@/assets/images/com/';

.myset-page {
  .container {
    padding: 15px 15px 0;
  }
}
.infoBox {
  background: #fff;
  // background: rgb(231, 231, 230);
  border-radius: 10px;
  margin-bottom: 72px;

  .item {
    padding: 20px 15px;

    .uploadBox {
      width: 100%;
    }

    .itemTitle {
      font-size: 16px;
      font-weight: 700;
      color: #292929;
    }

    .userIcon {
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 30px;
    }

    .userName {
      color: #b1b2b7;
    }
  }

  .rightArrowIcon {
    width: 7px;
    height: 12px;
    background: url('@{imgComUrl}icon-right-arrow.png') no-repeat center / cover;
    margin-left: 16px;
  }
}

.btnBox {
  .logOutBtn {
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    border: none;
  }
}

/deep/ .van-uploader {
  width: 100%;
  .van-uploader__wrapper {
    width: 100%;
    .van-uploader__input-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
