import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Users from '@/components/users'
import Articles from '@/components/articles'
import About from '@/components/About'
import Links from '@/components/Links'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/links',
      name: 'links',
      component: Links
    }
  ]
})
