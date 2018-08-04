<template>
  <section class="me-module module text-center">
    <!-- <img class="avatar" src="/static/img/suxiao-hahaha.jpg" />  -->
    <h1>姓名：{{ fullname }}</h1>
    <h2>昵称：{{ nickname }}</h2>
    <h3>性别：{{ gender }}</h3>
    <div class="browser-info text-left clearfix">
      <ol>
        <li v-for="(value, key, index) in browserInfo" :key="key">
          <span class="info-key">{{key}}</span>: 
          <span class="info-value">{{value}}</span>
          </li>
      </ol>
      <button @click="getBrowserInfo" class="pull-right">getBrowserInfo</button>
    </div>
    <button v-if="isLogin" v-text @click="goLogInOut('out')">logout</button>
    <button v-else @click="goLogInOut('in')">login</button>
  </section>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'author',
  data() {
    return {
      browserInfo: {}
    }
  },
  created() {
    document.title = this.$route.name
  },
  mounted() {
    this.getBrowserInfo()
  },
  computed: {
    ...mapState({
      fullname: state => state.userProfile.fullname,
      nickname: state => state.userProfile.nickname,
      gender: state => state.userProfile.gender,
    }),
    ...mapGetters([
      'isLogin'
    ])
  },
  methods: {
    goLogInOut(target) {
      if (target === 'in') {
        window.location.href = '/login'
      }
      else if (target === 'out') {
        window.location.href = '/logout'
      }
    },
    getBrowserInfo() {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.module {
  text-align: center;
}
.avatar {
  display: inline-block;
  width: 200px;
  height: auto;
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
    min-width: 200px;
    font-weight: bold;
    font-size: 1.4rem;
  }
  .info-value {

  }
}
</style>
