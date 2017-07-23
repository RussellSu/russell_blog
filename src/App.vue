<template>
  <div id="app">
    <router-view></router-view>
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

<style>
  body {
    background-image: url("./assets/bg_body003.png");
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #7e9e9d;
    margin-top: 60px;
  }
</style>
