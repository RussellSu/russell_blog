<template>
  <nav class="side-nav">
    <div class="user-info">
      <span v-if="user._id">
        {{!user.fullname}}
      </span>
      <span v-else>
        未登录
      </span>
    </div>
    <ul>
      <li v-for="item of navList">
        <router-link v-bind:to="item.routeName" exact>{{item.title}}</router-link>
      </li>
      <li class="logout-btn">
        <a href="/logout">logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
//  import sidebar from '@/web/navList'
var navList = [
  // {title: 'home', routeName: '/', exact: true},
  { title: 'articles', routeName: '/articles' },
  { title: 'links', routeName: '/links' },
  { title: 'me', routeName: '/me' }
]
// var user = window.Russell.user
export default {
  name: 'navbar',
  data() {
    return {
      navList: navList,
      user: {}
    }
  },
  created() {
    console.log('sidebar created')
  },
  mounted() {
    console.log('sidebar mounted', window.Russell.user)
    this.user = window.Russell.user || {}
    console.log('sidebar mounted', 'window.Russell', window.Russell)
  }
}
</script>
<style lang="scss" scoped >
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  height: 100vh;
  background-color: #000;
  text-align: center;
  transform: translateX(-90px);
  // transform: translateX(0);
  transition: transform 0.5s linear;
}

nav:hover {
  transform: translateX(0);
}

nav:after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  right: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000;
}
.user-info {
  line-height: 80px;
  background-color: #2e2e2e;
  border-radius: 50%;
  margin: 10px;
}
ul {
  margin-top: 40px;
  height: calc(100% - 40px);
}
li {
  display: block;
  a {
    width: 100%;
    display: inline-block;
    padding: 10px 0;
    // font-size: 20px;
    color: #fff;
    line-height: 30px;
    &:hover {
      // color: #00FF39;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &.router-link-active {
      color: #00ff39;
    }
  }
}
.logout-btn {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
