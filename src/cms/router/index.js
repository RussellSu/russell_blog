import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/cms/components/Hello'
import Users from '@/cms/components/users'
import Articles from '@/cms/components/articles'
import ArticleItem from '@/cms/components/ArticleItem'
import About from '@/cms/components/About'
import Links from '@/cms/components/Links'
import EditArticle from '@/cms/components/EditArticle'
import NotFoundPage from '@/cms/components/notFoundPage'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        requireAuth: true // 需要登陆
      }
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      // children: [
      //   {
      //     path: ':id',
      //     name: 'articleItem',
      //     component: ArticleItem
      //   }
      // ]
    },
    {
      path: '/articles/:id',
      name: 'articleItem',
      component: ArticleItem,
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
    },
    {
      path: '*',
      name: 'notFoundPage',
      component: NotFoundPage
    }
  ]
})
// var _this = this
router.beforeEach((to, from, next) => {
  console.log('to', to)
  if (to.matched.some(item => item.meta.requireAuth)) {
    if (window.Russell.user) {
      next()
    }
    else {
      window.location.href = '/logout' // logout销毁session,server控制跳转login页
    }
  }
  else {
    next()
  }
})

export default router
