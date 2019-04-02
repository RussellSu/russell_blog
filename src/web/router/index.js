import Vue from 'vue'
import Router from 'vue-router'
// import Articles from '@/web/components/articles'
// import ArticleItem from '@/web/components/ArticleItem'
// import Videos from '@/web/components/Videos'
// import Video from '@/web/components/Video'
// import Links from '@/web/components/Links'
import Author from '@/web/components/Author'
import Me from '@/web/components/Me'
// import EditArticle from '@/web/components/EditArticle'
// import NotFoundPage from '@/web/components/notFoundPage'
import store from '@/web/store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/articles',
    },
    {
      path: '/articles',
      name: 'articles',
      component: resolve => {
        import('@/web/components/articles').then(module => {
          resolve(module)
        })
      },
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
      component: resolve => {
        import('@/web/components/ArticleItem').then(module => {
          resolve(module)
        })
      },
    },
    {
      path: '/editArticle',
      name: 'editArticle',
      component: resolve => {
        import('@/web/components/EditArticle').then(module => {
          resolve(module)
        })
      },
      meta: {
        requireAuth: true, // 需要登陆
      },
    },
    {
      path: '/videos',
      name: 'videos',
      component: resolve => {
        import('@/web/components/Videos').then(module => {
          resolve(module)
        })
      },
    },
    {
      path: '/videos/:id',
      name: 'video',
      component: resolve => {
        import('@/web/components/Video').then(module => {
          resolve(module)
        })
      },
    },
    {
      path: '/links',
      name: 'links',
      component: resolve => {
        import('@/web/components/Links').then(module => {
          resolve(module)
        })
      },
    },
    {
      path: '/author',
      name: 'author',
      component: Author,
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
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
      path: '/lab',
      name: 'lab',
      component: resolve => {
        import('@/web/components/Lab').then(module => {
          resolve(module)
        })
      },
    },
    {
      path: '*',
      name: 'notFoundPage',
      component: resolve => {
        import('@/web/components/notFoundPage').then(module => {
          resolve(module)
        })
      },
    },
  ],
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
