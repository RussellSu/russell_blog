import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/cms/components/articles'
import ArticleItem from '@/cms/components/ArticleItem'
import Movies from '@/cms/components/Movies'
import Movie from '@/cms/components/Movie'
import Author from '@/cms/components/Author'
import EditArticle from '@/cms/components/EditArticle'
import NotFoundPage from '@/cms/components/notFoundPage'
import store from '@/cms/store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: '/cms/',
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
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: Movie
    },
    {
      path: '/author',
      name: 'author',
      component: Author
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
