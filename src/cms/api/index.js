import service from '@/cms/utils/service.js'

export default {
  getUserProfile () {
    return service({
      url: '/api/profile',
      method: 'GET'
    })
  },
  mergeChunk (data) {
    return service({
      url: '/api/uploads/mergeChunk',
      method: 'POST',
      data: data
    })
  },
  updateMovieAsset (id, data) {
    return service({
      url: `/api/movies/${id}/asset`,
      method: 'PUT',
      data: data
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
  getMovieList (pageSize = 10, curPage = 1) {
    return service({
      url: `/api/movies`,
      method: 'GET',
      params: {
        pageSize: pageSize,
        curPage: curPage
      }
    })
  },
  getMovieDetail (id) {
    return service({
      url: `/api/movies/${id}`,
      method: 'GET'
    })
  },
  createNewMovie (data) {
    return service({
      url: '/api/movies',
      method: 'POST',
      data: data
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
