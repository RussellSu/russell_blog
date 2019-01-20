import service from '@/web/utils/service.js'

export default {
  getUserProfile () {
    return service({
      url: '/api/profile',
      method: 'GET'
    })
  },
  getArticleList (pageSize = 10, curPage = 1) {
    return service({
      url: `/api/articles`,
      method: 'GET',
      params: {
        pageSize: pageSize,
        curPage: curPage
      }
    })
  },
  getArticleDetail (id) {
    return service({
      url: `/api/articles/${id}`,
      method: 'GET'
    })
  },
  createNewArticle (data) {
    return service({
      url: '/api/articles',
      method: 'POST',
      data: data
    })
  },
  getVideoList (pageSize = 10, curPage = 1) {
    return service({
      url: `/api/videos`,
      method: 'GET',
      params: {
        pageSize: pageSize,
        curPage: curPage
      }
    })
  },
  getVideoDetail (id) {
    return service({
      url: `/api/videos/${id}`,
      method: 'GET'
    })
  },
  getSongList (pageSize = 10, curPage = 1) {
    return service({
      url: `/api/songs`,
      method: 'GET',
      params: {
        pageSize: pageSize,
        curPage: curPage
      }
    })
  },
  getDemo (id, pageSize = 10, curPage = 1) {
    return service({
      url: `/api/getDemo/${pageSize}/${curPage}`,
      method: 'GET',
      params: {
        id: id
      }
    })
  },
  submitComment (data) {
    return service({
      url: '/api/comments',
      method: 'POST',
      data: data
    })
  },
  markLike (id, type) {
    return service({
      url: `/api/like/${id}`,
      method: 'POST',
      data: {
        type // article comment
      }
    })
  },
  uploadAvatar (data) {
    return service({
      url: '/api/upload/avatar',
      method: 'POST',
      data: data
    })
  },
  postDemo (data) {
    return service({
      url: '/api/postDemo',
      method: 'POST',
      data: data
    })
  },
  putDemo () {
    return service({
      url: '/api/putDemo',
      method: 'PUT'
    })
  },
  deleteDemo () {
    return service({
      url: '/api/deleteDemo',
      method: 'DELETE'
    })
  }
}
