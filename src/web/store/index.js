import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import userProfile from './modules/userProfile'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    userProfile
  }
})

export default store
