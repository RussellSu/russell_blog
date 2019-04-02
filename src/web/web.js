// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueScroller from 'vue-scroller'
import Web from './Web.vue'
// import Axios from 'axios'
import Moment from 'moment'
import tool from '@/web/utils/tool.js'
import api from '@/web/api/index.js'
import service from '@/web/utils/service.js'
import store from '@/web/store/index.js'
import 'font-awesome/css/font-awesome.min.css'
import router from './router'
// Axios.defaults.headers.post['content-Type'] = 'appliction/json' // 默认 application/x-www-urlencoded
Vue.prototype.$http = service
// Vue.prototype.$http = Axios
Vue.prototype.$moment = Moment
Vue.prototype.$api = api
Vue.prototype.$tool = tool
Vue.use(VueScroller)
Vue.config.productionTip = false
Vue.filter('time_format', (value, formatStr = 'YYYYMMDD') => Moment(value).format(formatStr))
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
const vue = new Vue({
  router,
  store,
  render: h => h(Web),
}).$mount('#web')
window.vueVO = vue
