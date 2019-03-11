// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import CMS from './App.vue'
// import Axios from 'axios'
import Moment from 'moment'
import SimpleUploader from 'vue-simple-uploader'
import tool from '@/cms/utils/tool.js'
import api from '@/cms/api/index.js'
import service from '@/cms/utils/service.js'
import store from '@/cms/store/index.js'
import 'font-awesome/css/font-awesome.min.css'
import router from './router'

Vue.use(SimpleUploader)
// Axios.defaults.headers.post['content-Type'] = 'appliction/json' // 默认 application/x-www-urlencoded
Vue.prototype.$http = service
// Vue.prototype.$http = Axios
Vue.prototype.$moment = Moment
Vue.prototype.$api = api
Vue.prototype.$tool = tool
Vue.config.productionTip = false
Vue.filter('time_format', (value, formatStr = 'YYYYMMDD') => Moment(value).format(formatStr))
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
const vue = new Vue({
  router,
  store,
  render: h => h(CMS),
}).$mount('#cms')
window.vueVO = vue
