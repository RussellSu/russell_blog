import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import userProfile from './modules/userProfile'
import { logger, typeCheck } from './plugins'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: ['dev', 'sit'].includes(process.env.NODE_ENV),
  modules: {
    app,
    userProfile,
  },
  plugins: [
    logger,
    typeCheck,
  ],
})

export default store
