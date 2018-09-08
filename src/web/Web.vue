<template>
  <div id="web">
    <div class="main-wrapper">
      <transition name="fade" mode="out-in" :duration="500">
        <router-view></router-view>
      </transition>
    </div>
    <nav-bar></nav-bar>
    <loading :active="activeLoading" :content="loadingContent"></loading>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NavBar from '@/web/components/NavBar'
import Loading from '@/web/components/Loading'
// import {mapGetters, mapState} from 'vuex'
import '@/web/styles/index.scss'

export default {
  name: 'web',
  components: {
    NavBar,
    Loading
  },
  computed: {
    ...mapState({
      activeLoading: state => state.app.loading.active,
      loadingContent: state => state.app.loading.content,
    }),
    ...mapGetters([
      'isLogin'
    ])
  },
  created() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      this.$store.dispatch('getUserProfile')
    }
  },
}
</script>

<style lang="scss">
body {
  background-image: url('./assets/bg_body003.png');
}

#web {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #7e9e9d; // margin-top: 60px;

  @media screen and (max-width: 960px) {
    .main-wrapper {
      height: calc(100vh - 60px) !important;
    }
  }
  @media screen and (max-width: 360px) {
    .main-wrapper {
      section[class*='-module'] {
        margin: 0
      }
    }
  }
  .main-wrapper {
    margin: 0 auto;
    // padding-top: 50px;
    border-width: 0 1px;
    border-style: solid;
    border-color: rgba(216, 216, 216, 0.1);
    max-width: 1080px;
    height: 100vh;
    box-sizing: border-box;
    overflow: auto;

    section[class*='-module'] {
      margin: 0 20px;
      // padding-top: 50px;
      .module-title {
        margin: 0;
        line-height: 1.5;
        font-size: 3rem;
        text-align: center;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
