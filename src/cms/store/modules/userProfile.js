import api from '@/cms/api'
import TOOL from '@/cms/utils/tool.js'
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
    avatar: '',
    roles: [],
    createTime: '',
    updateTime: '',
  },
  mutations: {
    SET_USER_PROFILE (state, payload) { // 批量设置字段
      console.log('【SET_USER_PROFILE】', payload)
      for (let [key, value] of Object.entries(payload)) {
        if (state[key] !== undefined && value !== undefined) {
          state[key] = value
        }
      }
    },
    RESET_USER_PROFILE (state) {
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
        else if (TOOL.judgeType(value) === 'array') {
          state[key] = []
        }
      }
    },
  },
  actions: {
    getUserProfile ({ state, rootState, commit, dispatch }) {
      console.log('store action getUserProfile')
      api.getUserProfile().then(res => {
        if (res.data && res.data.user) {
          commit('SET_USER_PROFILE', res.data.user)
        }
      })
    },
  },
  getters: {
    isLogin (state, getter, rootState) {
      return !!state._id
    },
    isAdmin (state, getter, rootState) {
      return state.roles.includes('admin')
    },
    genderText (state) {
      let text = 'unknown'
      if (state.gender === 'M') {
        text = '小哥哥'
      }
      if (state.gender === 'F') {
        text = '小姐姐'
      }
      return text
    },
  },
}

export default userProfile
