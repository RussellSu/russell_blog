<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <navbar></navbar>
  </div>
</template>

<script>
  import Navbar from '@/components/SideBarNav'
  export default {
    name: 'app',
    components: {//  这写成对象而不是数组，为啥？
      Navbar
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
