<template>
  <div id="web">
    <div class="main-wrapper">
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from '@/web/components/SideBarNav'
import '@/web/styles/index.scss'

export default {
  name: 'web',
  created() {
    console.log('web.vue created')
    this.getProfile()
  },
  methods: {
    getProfile() {
      this.$http
        .get('/api/profile')
        .then(res => {
          if (res.data.user && res.data.user._id) {
            window.Russell.user = res.data.user
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    //  这写成对象而不是数组，为啥？
    Navbar
  }
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
  .main-wrapper {
    margin: 0 auto;
    // padding-top: 50px;
    border-width: 0 1px;
    border-style: solid;
    border-color: rgba(216, 216, 216, 0.1);
    max-width: 800px;
    height: 100vh;
    box-sizing: border-box;
    overflow: auto;

    section[class*='-module'] {
      margin: 0 20px;
      // padding-top: 50px;
      .module-title {
        margin: 0;
        line-height: 1.5;
        font-size: 4rem;
        text-align: center;
      }
    }
  }
}
</style>
