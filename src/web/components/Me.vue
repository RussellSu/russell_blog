<template>
  <section class="me-module module">
    <div class="text-right">
      <button v-if="isLogin" @click="goLogInOut('out')">logout</button>
      <button v-else @click="goLogInOut('in')">login</button>
      <button v-if="isAdmin" @click="goCMS">to CMS</button>
    </div>
    <!-- <img class="avatar" src="/img/suxiao-hahaha.jpg" />  -->
    <div class="user-info row clearfix" v-if="userId">
      <div class="avatar-uploader-wrapper pull-left m-3 position-R">
        <img class="avatar" :src="avatar"/>
        <i class="avatar-uploader-btn" @click="showAvatarEditor">上传头像</i>
        <avatar-editor :active="activeAvatarEditor" @ok="handleConfirmUpdateAvatar" @cancel="handleCancelUpdateAvatar"></avatar-editor>
      </div>
      <div class="m-6">
        <div class="" style="padding-left: 1rem;">
          <p>姓名：{{ fullname }}</p>
          <p>昵称：{{ nickname }}</p>
          <p>电话：{{ phoneNumber }}</p>
          <p>Email：{{ email }}</p>
          <p>性别：{{ genderText }}</p>
        </div>
      </div>
    </div>
    <h1></h1>
    <div class="browser-info text-left clearfix">
      <ol>
        <li v-for="(value, key) in browserInfo" :key="key">
          <span class="info-key">{{key}}</span>:
          <span class="info-value">{{value}}</span>
          </li>
      </ol>
      <button @click="getBrowserInfo" class="pull-right">getBrowserInfo</button>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AvatarEditor from '@/web/components/avatarEditor'
export default {
  name: 'me',
  components: {
    AvatarEditor,
  },
  data () {
    return {
      baseUrl: process.env.BASE_URL,
      browserInfo: {},
      activeAvatarEditor: false,
    }
  },
  created () {
    document.title = this.$route.name
  },
  mounted () {
    this.getBrowserInfo()
  },
  computed: {
    ...mapState({
      userId: state => state.userProfile._id,
      fullname: state => state.userProfile.fullname,
      nickname: state => state.userProfile.nickname,
      gender: state => state.userProfile.gender,
      phoneNumber: state => state.userProfile.phoneNumber,
      email: state => state.userProfile.email,
      thumbnail: state => state.userProfile.thumbnail,
      avatar: state => state.userProfile.avatar,
    }),
    ...mapGetters([
      'isLogin',
      'isAdmin',
      'genderText',
    ]),
  },
  methods: {
    refresh (done) {
      console.log('refresh')
      done()
    },
    infinite (done) {
      console.log('infinite')
      done()
    },
    showAvatarEditor () {
      this.activeAvatarEditor = true
    },
    handleConfirmUpdateAvatar () {
      this.activeAvatarEditor = false
    },
    handleCancelUpdateAvatar () {
      this.activeAvatarEditor = false
    },
    goLogInOut (target) {
      if (target === 'in') {
        window.location.href = '/login'
      }
      else if (target === 'out') {
        window.location.href = '/logout'
      }
    },
    getBrowserInfo () {
      this.browserInfo = {
        appCodeName: window.navigator.appCodeName,
        appName: window.navigator.appName,
        appVersion: window.navigator.appVersion,
        deviceMemory: window.navigator.deviceMemory,
        hardwareConcurrency: window.navigator.hardwareConcurrency,
        language: window.navigator.language,
        platform: window.navigator.platform,
        product: window.navigator.product,
        productSub: window.navigator.productSub,
        userAgent: window.navigator.userAgent,
        devicePixelRatio: window.devicePixelRatio,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      }
    },
    goCMS () {
      window.location.href = '/cms'
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.avatar {
  width: 100%;
  border: 1px dotted #fff;
}
.avatar-uploader-wrapper {
  &:hover .avatar-uploader-btn {
    display: block;
  }
}
.avatar-uploader-btn {
  display: none;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size:1.5rem;
  line-height: 3rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-align: center;
}
.browser-info {
  border: 1px solid #5b5b5b;
  padding: 10px;
  margin: 10px;
  ol {
    list-style-position: outside;
  }
  .info-key {
    display: inline-block;
    // min-width: 200px;
    font-weight: bold;
    font-size: 1.4rem;
  }
  .info-value {
    color: #FF0;
  }
}
</style>
