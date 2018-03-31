// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import Moment from 'moment'

Axios.defaults.headers.post['content-Type'] = 'appliction/json'
Vue.prototype.$http = Axios
Vue.prototype.$moment = Moment

Vue.config.productionTip = false

import router from './router'

Vue.filter('time_format', function (value, formatStr = 'YYYYMMDD') {
  return Moment(value).format(formatStr)
})

window.Russell = {}
/* eslint-disable no-new */
new Vue({
  el: '#cms',
  router,
  template: '<App/>',
  components: { App }
})
