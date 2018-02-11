import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Users from '@/components/users'
import Articles from '@/components/articles'
import ArticleItem from '@/components/ArticleItem'
import About from '@/components/About'
import Links from '@/components/Links'
import Me from '@/components/Me'
import EditArticle from '@/components/EditArticle'
import NotFoundPage from '@/components/notFoundPage'

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
      path: '/editArticle',
      name: 'editArticle',
      component: EditArticle,
      meta: {
        requireAuth: true // 需要登陆
      }
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
      path: '/me',
      name: 'me',
      component: Me
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
      console.log('Russell.user', window.Russell.user)
      next()
    }
    else {
      window.location.href = '/login'
    }
  }
  else {
    next()
  }
})

export default router
