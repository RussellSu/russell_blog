import axios from 'axios'
// import tool from './tool.js'
// 创建 axios 实例
const service = axios.create({
  // baseURL: 'process.env.VUE_APP_API_BASE',
  timeout: 30000 // 请求超时时间
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  })
// 响应拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('service error', error)
    if (error && error.response) {
      switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        break
      case 401:
        error.message = '未授权，请登录'
        window.location.href = '/login'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = `请求地址出错${error.response.config.url}`
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器内部错误'
        if (error.response.data && error.response.data.notLogin) {
          window.location.href = '/login'
        }
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网关超时'
        break
      case 505:
        error.message = 'HTTP版本不受支持'
        break
      }
      console.error('!!!service error:', error)
    }
    else {
      console.error('error without error.response', error)
    }
    return Promise.reject(error.response)
  }
)

export default service
