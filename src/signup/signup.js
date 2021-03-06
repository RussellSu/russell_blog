// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Signup from './Signup.vue'
import Axios from 'axios'
import Moment from 'moment'

import 'font-awesome/css/font-awesome.min.css'
// import router from './router'

Vue.prototype.$http = Axios
Vue.prototype.$moment = Moment

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // el: '#signup',
  // router,
  render: h => h(Signup),
}).$mount('#signup')
