import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/web/components/articles'
import ArticleItem from '@/web/components/ArticleItem'
import About from '@/web/components/About'
import Links from '@/web/components/Links'
import Me from '@/web/components/Me'
import EditArticle from '@/web/components/EditArticle'
import NotFoundPage from '@/web/components/notFoundPage'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/articles'
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
