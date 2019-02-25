const app = {
  state: {
    permission: {},
    status: false,
    activePopup: false,
    popup: {
      title: '提示',
      content: '',
      okText: '确定',
      cancelText: '取消',
      okShow: true,
      cancelShow: true,
      height: '400',
      width: '600',
      okFoo: () => false,
      cancelFoo: () => false,
    },
    loading: {
      active: false,
      content: '加载中',
    },
  },
  mutations: {
    SET_STATUS (state, payload) { // 单独设置status 值
      state.status = payload
    },
    SET_APP (state, payload) { // 批量设置字段
      console.log('【SET_APP】', payload)
      for (let [key, value] of Object.entries(payload)) {
        if (state[key] !== undefined && value !== undefined) {
          state[key] = value
        }
      }
    },
    ACTIVE_POPUP (state, payload) {
      state.activePopup = true
      if (typeof payload === 'string') {
        state.popup.content = payload
      }
      else {
        payload.title && (state.popup.title = payload.title)
        payload.content && (state.popup.content = payload.content)
        payload.okText && (state.popup.okText = payload.okText)
        payload.cancelText && (state.popup.cancelText = payload.cancelText)
        typeof payload.okShow === 'boolean' && (state.popup.okShow = payload.okShow)
        typeof payload.cancelShow === 'boolean' && (state.popup.cancelShow = payload.cancelShow)
        payload.okFoo && (state.popup.okFoo = payload.okFoo)
        payload.cancelFoo && (state.popup.cancelFoo = payload.cancelFoo)
        payload.height && (state.popup.height = payload.height)
      }
    },
    INACTIVE_POPUP (state, payload) {
      state.activePopup = false
      state.popup.title = ''
      state.popup.content = ''
      state.popup.okText = '确定'
      state.popup.cancelText = '取消'
      state.popup.okShow = true
      state.popup.cancelShow = true
      state.popup.height = '400'
      state.popup.width = '600'
      state.popup.okFoo = () => false
      state.popup.cancelFoo = () => false
    },
    ACTIVE_LOADING (state, payload) {
      state.loading.active = true
      typeof payload === 'string' && (state.loading.content = payload)
    },
    INACTIVE_LOADING (state) {
      state.loading.active = false
      state.loading.content = '加载中'
    },
    SET_PERMISSION (state, payload) {
      state.permission = payload
    },
  },
}

export default app
