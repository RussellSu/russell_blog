<template>
  <div id="app">
    <div class="main-wrapper">
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from '@/components/SideBarNav'
import '@/styles/index.scss'

export default {
  name: 'app',
  components: {//  这写成对象而不是数组，为啥？
    Navbar
  }
}
</script>

<style lang="scss">
body {
  background-image: url("./assets/bg_body003.png");
}

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
      padding-top: 50px;
    }
  }
}
</style>
