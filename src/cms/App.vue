<template>
  <div id="cms">
    <div class="main-wrapper"
      @touchstart.stop.prevent="bottomNavTouchStart"
      @touchmove.stop.prevent="bottomNavTouchMove"
      @touchend.stop.prevent="bottomNavTouchEnd"
      ref="mainWrapper">
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
import NavBar from '@/cms/components/NavBar'
import Loading from '@/cms/components/Loading'
// import {mapGetters, mapState} from 'vuex'
import '@/cms/styles/index.scss'

export default {
  name: 'cms',
  components: {
    NavBar,
    Loading
  },
  data () {
    return {
      touch: {
        startX: 0,
        startY: 0,
      },
      percent: 0,
    }
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
  created () {
    this.getProfile()
  },
  methods: {
    getProfile () {
      this.$store.dispatch('getUserProfile')
    },
    bottomNavTouchStart (e) {
      const touch = e.touches[0]
      const startX = touch.pageX
      const startY = touch.pageY
      this.touch.startX = startX
      this.touch.startY = startY
      console.log('bottomNavTouchStart startX startY', startX, startY)
    },
    bottomNavTouchMove (e) {
      const touch = e.touches[0]
      // 横向和纵向偏离位置
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      // 当 横向偏离位置 大于 纵向偏离位置 时才认为滑动有效
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (Math.abs(deltaX) < 50) {
        return
      }
      console.log(`deltaX is ${Math.abs(deltaX)}, should change route`)
      // const left = this.currentPlay == 'red' ?  0 : -window.innerWidth
      // var offsetWidth = Math.min(0, Math.max(-window.innerWidth,left+deltaX))
      // // 记录滑动的距离占屏幕宽度的百分比，如果滑动太少则不切换
      // this.percent = Math.abs(offsetWidth/window.innerWidth)
      // // 移动红黄块
      // this.$refs.mainWrapper.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
      // // 设置动画时间

      console.log('bottomNavTouchMove deltaX deltaY', deltaX, deltaY)
    },
    bottomNavTouchEnd (e) {
      console.log('bottomNavTouchEnd e', e)
      // let offsetWidth
      // let percent
      // if(this.currentPlay === 'red'){
      //   if(this.percent > 0.1) {
      //     this.currentPlay = 'yellow'
      //     offsetWidth = -window.innerWidth
      //   } else {
      //     offsetWidth = 0
      //   }
      // } else {
      //   if(this.percent < 0.9) {
      //     this.currentPlay = 'red'
      //     offsetWidth = 0
      //   } else {
      //     offsetWidth = -window.innerWidth
      //   }
      // }
      // this.$refs.mainWrapper.style["transform"]  = `translate3d(${offsetWidth}px,0,0)`
    },
  },
}
</script>

<style lang="scss">
body {
  background-image: url('./assets/bg_body003.png');
}

#cms {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #7e9e9d; // margin-top: 60px;

  @media screen and (max-width: 960px) {
    .main-wrapper {
      height: calc(100vh - 60px) !important;
      margin: 0 auto !important;
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
    margin-left: 200px;
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
