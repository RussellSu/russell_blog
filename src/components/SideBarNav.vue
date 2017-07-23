<template>
  <nav class="side-nav">
    <ul>
      <li v-for="item in navList">
        <router-link :to="item.routeName">{{item.title}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  //  import sidebar from '@/navList'
  var navList = [
    {title: 'home', routeName: '/'},
    {title: 'users', routeName: '/users'},
    {title: 'articles', routeName: '/articles'},
    {title: 'links', routeName: '/links'},
    {title: 'about', routeName: '/about'}
  ]
  export default {
    name: 'navbar',
    data  () {
      return {
        navList: navList
      }
    }
  }
</script>
<style lang="scss" scoped >
  nav{
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-100px);
    width: 100px;
    height: 100vh;
    background-color: #000;
  }
  nav:hover{
    transform: translateX(0);
  }
  nav:after{
    content:"";
    display: block;
    position:absolute;
    top:50%;
    right:-10px;
    width:20px;
    height:20px;
    border-radius: 50%;
    background-color: #000;
  }
  li {
    list-style: none;
  }
</style>
