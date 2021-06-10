<!--
 * @Author: wangshengxian
 * @Date: 2020-11-27 17:05:04
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-30 12:44:38
 * @Desc: 修改昵称 - page
-->
<template>
  <div class="nickname-page">
    <headerBar />
    <div class="main">
      <van-field class="nickName" v-model="nickname" clearable placeholder="请输入昵称" />
      <van-button class="saveBtn" type="info" size="small" :loading="isLoading" loading-text="加载中..." @click="onSave"
        >保存</van-button
      >
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import api from '@/api/user'
import Cookie from 'js-cookie'
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {
      nickname: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo'])
  },
  created() {
    this.nickname = this.$route.query.nickname
  },
  mounted() {},
  methods: {
    onSave() {
      console.log('-save-', this.nickname)
      if (!this.nickname) {
        this.$toast('昵称不能为空！')
        return
      }
      const params = { nickname: this.nickname }
      this.isLoading = true
      api.editUserInfo(params).then(res => {
        console.log('-res-', res)
        setTimeout(() => {
          this.isLoading = false
          let userInfo = { ...this.userInfo }
          userInfo.myName = this.nickname
          Cookie.set('userInfo', userInfo, { expires: 1 })
          this.$store.commit('user/setUserInfo', userInfo)
          this.$toast({
            type: 'success',
            message: '修改成功',
            onClose: () => {
              this.$router.go(-1)
            }
          })
        }, 500)
      })
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.main {
  padding: 15px 15px 0;

  .nickName {
    border-bottom: 1px solid rgb(235, 234, 234);
    margin-bottom: 15px;
  }
  .saveBtn {
    width: 100%;
    height: 40px;
    background: #5fc0a3;
    border: 1px solid #5fc0a3;
    border-radius: 20px;
  }
}
</style>
