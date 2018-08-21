import api from '@/web/api'

const userProfile = {
  state: {
    _id: '',
    fullname: '', // { type: String, default: '', index: true },
    nickname: '', // { type: String, default: '', trim: true },
    prid: '', // { type: String, default: '', index: true },
    email: '', // { type: String, default: '', unique: true },
    phoneNumber: '', // { type: String, default: '' },
    gender: '', // { type: String, default: 'M', enum: ['M', 'F'] },
    thumbnail: '',
    createTime: '',
    updateTime: ''
  },
  mutations: {
    SET_USER_PROFILE(state, payload) { // 批量设置字段
      console.log('【SET_USER_PROFILE】', payload)
      for (let [key, value] of Object.entries(payload)) {
        if (state[key] !== undefined && value !== undefined) {
          state[key] = value
        }
      }
    },
    RESET_USER_PROFILE(state) {
      console.log('【RESET_USER_PROFILE】')
      for (let [key, value] of Object.entries(state)) {
        if (typeof value === 'string') {
          state[key] = ''
        }
        else if (typeof value === 'number') {
          state[key] = 0
        }
        else if (typeof value === 'boolean') {
          state[key] = false
        }
        // else if (typeof value === 'boolean') {
        //   state[key] = false
        // }
      }
    },
  },
  actions: {
    getUserProfile({state, rootState, commit, dispatch}) {
      console.log('store action getUserProfile')
      api.getUserProfile().then(res => {
        if (res.data && res.data.user) {
          commit('SET_USER_PROFILE', res.data.user)
        }
      })
    },
  },
  getters: {
    isLogin(state, getter, rootState) {
      console.log('isLogin', state)
      return !!state._id
    }
  }
}

export default userProfile
