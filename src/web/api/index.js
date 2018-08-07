import service from '@/web/utils/service.js'

export default {
  getUserProfile() {
    return service({
      url: '/api/profile',
      method: 'GET'
    })
  },
  getArticleList(pageSize = 10, curPage = 1) {
    return service({
      url: `/api/articles`,
      method: 'GET',
      params: {
        pageSize: pageSize,
        curPage: curPage
      }
    })
  },
  getArticleDetail(id) {
    return service({
      url: `/api/articles/${id}`,
      method: 'GET'
    })
  },
  createNewArticle(data) {
    return service({
      url: '/api/articles',
      method: 'POST',
      data: data
    })
  },
  getDemo(id, pageSize = 10, curPage = 1) {
    return service({
      url: `/api/getDemo/${pageSize}/${curPage}`,
      method: 'GET',
      params: {
        id: id
      }
    })
  },
  submitComment(data) {
    return service({
      url: '/api/comments',
      method: 'POST',
      data: data
    })
  },
  postDemo(data) {
    return service({
      url: '/api/postDemo',
      method: 'POST',
      data: data
    })
  },
  putDemo() {
    return service({
      url: '/api/putDemo',
      method: 'PUT'
    })
  },
  deleteDemo() {
    return service({
      url: '/api/deleteDemo',
      method: 'DELETE'
    })
  }
}
