<template>
<div>
  <nav class="side-nav">
    <div class="user-info" v-if="isLogin" :style="{'background-image':`url(${thumbnail})`}">
    </div>
    <div class="user-info" v-else @click="toLogin">未登录</div>
    {{fullname}}
    {{nickname}}
    <ul>
      <li v-for="item of navList" :key="item.title">
        <router-link :to="item.routeName" exact>{{item.title}}</router-link>
      </li>
      <li class="logout-btn" v-if="isLogin">
        <a href="/logout">logout</a>
      </li>
    </ul>
  </nav>
  <nav class="bottom-nav">
    <ul>
      <li v-for="item of navList" :key="item.title">
        <router-link :to="item.routeName" exact>{{item.title}}</router-link>
      </li>
      <li class="logout-btn hide" v-if="isLogin">
        <a href="/logout">logout</a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
//  import sidebar from '@/web/navList'
import { mapState, mapGetters } from 'vuex'
var navList = [
  // {title: 'home', routeName: '/', exact: true},
  { title: 'articles', routeName: '/articles' },
  { title: 'links', routeName: '/links' },
  { title: 'author', routeName: '/author' },
  { title: 'me', routeName: '/me' },
]
// var user = window.Russell.user
export default {
  name: 'navBar',
  data () {
    return {
      navList: navList,
      user: {}
    }
  },
  created () {
    console.log('sidebar created')
  },
  mounted () {
    // console.log('sidebar mounted', window.Russell.user)
    // this.user = window.Russell.user || {}
    // console.log('sidebar mounted', 'window.Russell', window.Russell)
  },
  computed: {
    ...mapState({
      fullname: state => state.userProfile.fullname,
      nickname: state => state.userProfile.nickname,
      gender: state => state.userProfile.gender,
      thumbnail: state => state.userProfile.thumbnail,
    }),
    ...mapGetters([
      'isLogin'
    ])
  },
  methods: {
    toLogin () {
      window.location.href = '/login'
    }
  }
}
</script>
<style lang="scss" scoped >
.side-nav {
  display: none;
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
@media screen and (min-width: 961px) {
  .side-nav {
    transform: translateX(0);
    display: block;
  }
}
.side-nav:hover {
  transform: translateX(0);
}

.side-nav:after {
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
  height: 80px;
  line-height: 80px;
  margin: 10px;
  border-radius: 50%;
  background-color: #2e2e2e;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.side-nav ul {
  margin-top: 40px;
  height: calc(100% - 40px);
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
}
.logout-btn {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background-color: #000;
  text-align: center;
  // transform: translateX(-90px);
  // transform: translateX(0);
  transition: transform 0.5s linear;
}
@media screen and (max-width: 960px) {
  .bottom-nav {
    display: block;
  }
}
.bottom-nav ul {
  // margin-top: 40px;
  // height: calc(100% - 40px);
  li {
    width: 25vw;
    box-sizing: border-box;
    &:not(:first-of-type) {
      border-left: 1px solid #898989;
    }
    a {
      // min-width: 20vw;
      display: inline-block;
      font-size: 1.5rem;
      color: #fff;
      line-height: 50px;
      &:hover {
        // color: #00FF39;
        // background-color: rgba(255, 255, 255, 0.3);
      }
      &.router-link-active {
        color: #00ff39;
      }
    }
  }
}
</style>
