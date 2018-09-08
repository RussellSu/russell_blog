// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import Moment from 'moment'
import 'font-awesome/css/font-awesome.min.css'
import router from './router'
// Axios.defaults.headers.post['content-Type'] = 'appliction/json'
Vue.prototype.$http = Axios
Vue.prototype.$moment = Moment

Vue.config.productionTip = false

Vue.filter('time_format', (value, formatStr = 'YYYYMMDD') => {
  return Moment(value).format(formatStr)
})

window.Russell = {}
/* eslint-disable no-new */
new Vue({
  // el: '#cms',
  router,
  render: h => h(App)
}).$mount('#cms')
