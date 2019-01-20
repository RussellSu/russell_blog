import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/web/components/articles'
import ArticleItem from '@/web/components/ArticleItem'
import Videos from '@/web/components/Videos'
import Video from '@/web/components/Video'
import Links from '@/web/components/Links'
import Author from '@/web/components/Author'
import Me from '@/web/components/Me'
import EditArticle from '@/web/components/EditArticle'
import NotFoundPage from '@/web/components/notFoundPage'
import store from '@/web/store'

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
      path: '/videos',
      name: 'videos',
      component: Videos,
    },
    {
      path: '/videos/:id',
      name: 'video',
      component: Video,
    },
    {
      path: '/links',
      name: 'links',
      component: Links
    },
    {
      path: '/author',
      name: 'author',
      component: Author
    },
    {
      path: '/me',
      name: 'me',
      component: Me
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '*',
      name: 'notFoundPage',
      component: NotFoundPage
    }
  ]
})
router.beforeEach((to, from, next) => {
  // let _this = this
  console.log('to', to)
  console.log(store)
  if (to.matched.some(item => item.meta.requireAuth)) {
    if (store.state.userProfile._id) {
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
